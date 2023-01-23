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

// export const signUpWithEmail = async (email, password, nickname) => {
//   try {
//       const response = await createUserWithEmailAndPassword(authService, email, password)
//       .then((res)=>{
//           updateProfile(authService.currentUser, {
//               displayName: nickname
//           })
//       })
//       return response;
//   } catch (error) {
//       console.log(error);
//       console.log(error.code)
//       if(error.code === "auth/email-already-in-use") alert("사용중인 이메일입니다!")
//       return error;
//   }

// }

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const response = await signInWithEmailAndPassword(auth, email, password);
    return response;
  } catch (error) {
    switch (error.code) {
      case "auth/wrong-password":
        alert("비밀번호가 틀렸습니다.");
        break;
      case "auth/user-not-found":
        alert("이메일 혹은 비밀번호를 확인해주세요.");
        break;
    }
    return error;
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
