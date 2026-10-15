import PaymentClient from "./payment-client";

export default async function Page({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
  const query = await searchParams;
  return <PaymentClient success={query.success === "true"} cancelled={query.cancelled === "true"} />;
}
