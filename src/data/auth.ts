import { auth, currentUser } from "@clerk/nextjs/server";

export async function getCurrentUser() {
  const user = await currentUser();

  return user;
}

export async function getAuthUserId() {
  const { userId } = await auth();

  return userId;
}

export async function getUserRole() {
  const { sessionClaims } = await auth();

  return sessionClaims?.metadata.role;
}

export async function isUserAdmin() {
  const role = await getUserRole();

  return role === "admin";
}
