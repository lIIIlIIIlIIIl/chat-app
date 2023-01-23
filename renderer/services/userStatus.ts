import {
  push,
  ref,
  set,
  serverTimestamp,
  limitToLast,
  onValue,
  onDisconnect,
  get,
  orderByValue,
  query,
  equalTo,
  remove,
} from "@firebase/database";
import { Timestamp } from "firebase/firestore";
import { auth, database } from "./firebase";

interface UserList {
  uid: string;
  displayName: string;
}

export const onUserConnect = () => {
  const uid = auth.currentUser.uid;
  const myConnectionsRef = ref(database, `users/${uid}/connected`);
  const myDisplayNameRef = ref(database, `users/${uid}/displayName`);
  const lastOnlineRef = ref(database, `users/${uid}/lastOnline`);
  const connectedRef = ref(database, ".info/connected");
  onValue(connectedRef, snap => {
    if (snap.val() === true) {
      set(myConnectionsRef, true);
      set(myDisplayNameRef, auth.currentUser.displayName);
      onDisconnect(myConnectionsRef).remove();

      onDisconnect(lastOnlineRef).set(serverTimestamp());
    }
  });
};

export const getUserOnline = async () => {
  const uid = auth.currentUser.uid;
  const connectedRef = ref(database, "users");
  try {
    let result: UserList[] = [];
    const response = await get(connectedRef);
    const users = Object.keys(response.val());
    users.forEach(user => {
      if (user !== uid) {
        if (
          response.val()[user].connected !== undefined &&
          response.val()[user].connected === true
        )
          result.push({
            uid: user,
            displayName: response.val()[user].displayName,
          });
      }
    });
    return result;
  } catch (error) {
    console.log(error);
  }
};
