import { auth } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export async function signUpWithEmail(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("Error signing up:", error.message);
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred during sign-up");
  }
}

export async function signInWithEmail(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error signing in:", error.message);
      throw new Error(error.message);
    }
    throw new Error("An unknown error occurred during sign-in");
  }
}

export async function signOutWithEmail() {
  try {
    await signOut(auth);
    console.log("Sign-out successful");
  } catch (error) {
    console.log("Error during Sign-out: ", error);
  }
}
