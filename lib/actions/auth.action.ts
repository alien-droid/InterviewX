"use server";

import { db, auth } from "@/firebase/admin";
import { cookies } from "next/headers";

export async function signUp(params: SignUpParams) {
  const { uid, name, email } = params;

  try {
    const userRecord = await db.collection("users").doc(uid).get();

    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists. Please sign in.",
      };
    }

    await db.collection("users").doc(uid).set({
      name,
      email,
    });

    return {
      success: true,
      message: "User created successfully. Please sign in.",
    };
  } catch (error: any) {
    console.error("Error creating user:", error);

    if (error.code === "auth/email-already-exists") {
      return {
        message: "This email is already in use",
        success: false,
      };
    }
    return {
      success: false,
      message: "Unable to create user",
    };
  }
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord) {
      return {
        success: false,
        message:
          "User not found. Create an account or sign in with another method.",
      };
    }

    await getSessionCookie(idToken);
  } catch (error) {
    console.error("Error signing in:", error);
    return {
      success: false,
      message: "Unable to log in",
    };
  }
}

export async function getSessionCookie(idToken: string) {
  const cookieStore = await cookies();
  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: 60 * 60 * 24 * 7 * 1000,
  });
  cookieStore.set("session", sessionCookie, {
    maxAge: 60 * 60 * 24 * 7,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function getCurrentUser(): Promise<User | null> {
  const sessionCookie = await cookies();
  const idToken = sessionCookie.get("session")?.value;
  if (!idToken) {
    return null;
  }
  try {
    const decodedClaims = await auth.verifySessionCookie(idToken, true);
    const user = await db.collection("users").doc(decodedClaims.uid).get();
    if (!user.exists) return null;
    return { ...user.data(), id: decodedClaims.uid } as User;
  } catch (error) {
    console.error("Error getting user:", error);
    return null;
  }
}

export const isAuthenticated = async () => {
  const user = await getCurrentUser();
  return !!user;
};

