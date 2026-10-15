import "server-only";

import { redirect } from "next/navigation";
import { auth } from "./auth-no-edge";
import { Pet, User } from "@prisma/client";
import prisma from "./db";

export async function checkAuth({ requireAccess = true } = {}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  // Route middleware and JWT claims are not the authorization boundary.
  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { id: true, hasAccess: true },
  });
  if (!user) redirect("/login");
  if (requireAccess && !user.hasAccess) redirect("/payment");
  session.user.hasAccess = user.hasAccess;

  return session;
}

export async function getUserByEmail(email: User["email"]) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}

export async function getPetById(petId: Pet["id"]) {
  const pet = await prisma.pet.findUnique({
    where: {
      id: petId,
    },
  });
  return pet;
}

export async function getPetsByUserId(userId: User["id"]) {
  const pets = await prisma.pet.findMany({
    where: {
      userId,
    },
  });
  return pets;
}
