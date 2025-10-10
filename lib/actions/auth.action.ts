"use server";

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7;

export async function signUp(params: SignUpParams) {
  const { uid, name, email, isAdmin = false } = params;

  try {
    const userRecord = await db.collection("users").doc(uid).get();

    if (userRecord.exists) {
      return {
        success: false,
        message: "User already exists. Please sign in instead",
      };
    }

    await db.collection("users").doc(uid).set({
      name,
      email,
      isAdmin,
    });

    return {
      success: true,
      message: "Account Created Successfully! Please sign in",
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    console.error("Error creating a user", e);

    if (e.code === "auth/email-already-in-use") {
      return {
        success: false,
        message: "This email is already in use.",
      };
    }
    if (e.code === "auth/invalid-credential") {
      return {
        success: false,
        message: "error",
      };
    }

    return {
      success: false,
      message: "Failed to create an account",
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
        message: "User does not exists. Create an account instead.",
      };
    }

    await setSessionCookie(idToken);
  } catch (e) {
    console.log(e);

    return {
      success: false,
      message: "Failed to log into an account.",
    };
  }
}

export async function setSessionCookie(idToken: string) {
  const cookieStore = await cookies();

  const sessionCookie = await auth.createSessionCookie(idToken, {
    expiresIn: ONE_WEEK * 1000,
  });

  cookieStore.set("session", sessionCookie, {
    maxAge: ONE_WEEK,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session")?.value;

  if (!sessionCookie) return null;

  try {
    const deccodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    
    // Get user record from Firebase Auth to get creation time
    const authUserRecord = await auth.getUser(deccodedClaims.uid);
    
    const firestoreUserRecord = await db
      .collection("users")
      .doc(deccodedClaims.uid)
      .get();

    if (!firestoreUserRecord.exists) return null;

    const userData = firestoreUserRecord.data();
    
    return {
      ...userData,
      id: firestoreUserRecord.id,
      joinDate: authUserRecord.metadata.creationTime,
    } as User;
  } catch (e) {
    console.log(e);

    return null;
  }
}

export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}

export async function isAdminAuthenticated() {
  const user = await getCurrentUser();
  return !!user && user.isAdmin;
}

export async function logout() {
  const cookieStore = await cookies();

  // Clear the session cookie by setting it with empty value and 0 maxAge
  cookieStore.set("session", "", {
    maxAge: 0,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}

export async function signInWithGoogle(params: SignInParams) {
  const { email, idToken } = params;

  try {
    // Get user from Firebase Auth
    const userRecord = await auth.getUserByEmail(email);

    // Check if user exists in Firestore, if not, create it
    const firestoreUser = await db.collection("users").doc(userRecord.uid).get();
    if (!firestoreUser.exists) {
      await db.collection("users").doc(userRecord.uid).set({
        name: userRecord.displayName || "",
        email: userRecord.email,
        isAdmin: false,
        photoURL: userRecord.photoURL || null,
      });
    } else {
      // Update photoURL if it changed
      await db.collection("users").doc(userRecord.uid).update({
        photoURL: userRecord.photoURL || null,
      });
    }

    await setSessionCookie(idToken);

    return {
      success: true,
      message: "Google sign-in successful.",
    };
  } catch (error) {
    console.error("Google sign-in error", error);
    return {
      success: false,
      message: "Google sign-in failed.",
    };
  }
}
