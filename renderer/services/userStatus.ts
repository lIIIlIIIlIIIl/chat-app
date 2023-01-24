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
import { auth, database } from "./firebase";

interface UserList {
  uid: string;
  displayName: string;
  connected: boolean;
}

export const onUserConnect = () => {
  const uid = auth.currentUser.uid;
  const myConnectionsRef = ref(database, `users/${uid}/connected`);
  const myDisplayNameRef = ref(database, `users/${uid}/displayName`);
  const lastOnlineRef = ref(database, `users/${uid}/lastOnline`);
  const connectedRef = ref(database, ".info/connected");
  console.log(connectedRef);
  onValue(connectedRef, snap => {
    if (snap.val() === true) {
      console.log(snap.val());
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
    let userList: UserList[] = [];

    const response = await get(connectedRef);
    const users = Object.keys(response.val());
    users.forEach(user => {
      if (user !== uid) {
        userList.push({
          uid: user,
          displayName: response.val()[user].displayName,
          connected: response.val()[user].connected,
        });
      }
    });
    return { userList };
  } catch (error) {
    console.log(error);
  }
};