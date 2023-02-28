import { auth, database } from "./firebase";
import {
  createUserWithEmailAndPassword,
  getRedirectResult,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithRedirect,
  signOut,
  updateProfile,
} from "firebase/auth";
import { ref, set } from "firebase/database";

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response;
  } catch (error) {
    return error.code;
  }
};

export const signupFuc = (email: string, password: string) =>
  createUserWithEmailAndPassword(auth, email, password);

export const userProfileFuc = (nickname: string) =>
  updateProfile(auth.currentUser, { displayName: nickname });

export const signInWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(auth, provider);
    const response = await getRedirectResult(auth);
    return response;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const logoutFuc = async () => {
  const uid = auth.currentUser.uid;
  const myConnectionsRef = ref(database, `users/${uid}/connected`);

  try {
    signOut(auth);
    set(myConnectionsRef, false);
  } catch (error) {
    console.log(error);
  }
};

export const getMyUID = () => {
  try {
    const uid: string = auth.currentUser.uid;
    return uid;
  } catch (error) {
    console.log(error);
  }
};
