import prisma from "@/lib/db";
import { getStripe } from "@/lib/stripe";

export async function POST(request: Request) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  const priceId = process.env.STRIPE_PRICE_ID;
  if (!webhookSecret || !priceId || !process.env.STRIPE_SECRET_KEY) {
    return Response.json({ error: "Payments are not configured." }, { status: 503 });
  }
  const stripe = getStripe();
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  if (!signature) return Response.json(null, { status: 400 });

  // verify webhook came from Stripe
  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    );
  } catch {
    console.error("Webhook verification failed");
    return Response.json(null, { status: 400 });
  }

  // fulfill order
  switch (event.type) {
    case "checkout.session.completed":
    case "checkout.session.async_payment_succeeded": {
      const checkout = event.data.object;
      if (checkout.mode !== "payment" || checkout.payment_status !== "paid" || !checkout.client_reference_id) break;
      const lines = await stripe.checkout.sessions.listLineItems(checkout.id, { limit: 2 });
      if (lines.data.length !== 1 || lines.has_more || lines.data[0].price?.id !== priceId || lines.data[0].quantity !== 1) break;
      await prisma.user.update({
        where: {
          id: checkout.client_reference_id,
        },
        data: {
          hasAccess: true,
        },
      });
      break;
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  // return 200 OK
  return Response.json(null, { status: 200 });
}
