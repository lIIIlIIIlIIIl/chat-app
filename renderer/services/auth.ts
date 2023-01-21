import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";

export const signupFuc = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const userProfileFuc = (nickname: string) =>
  updateProfile(auth.currentUser, { displayName: nickname });

export const loginFuc = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const logoutFuc = () => signOut(auth);
