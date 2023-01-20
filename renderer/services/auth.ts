import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

export const signupFuc = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const loginFuc = (email: string, password: string) =>
  signInWithEmailAndPassword(auth, email, password);

export const logoutFuc = () => signOut(auth);
