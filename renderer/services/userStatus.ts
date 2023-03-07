import {
  ref,
  set,
  serverTimestamp,
  onValue,
  onDisconnect,
  get,
} from "@firebase/database";
import { auth, database } from "./firebase";

interface UserList {
  uid: string;
  displayName: string;
  connected: boolean;
}

// 로그인시 users에 저장됨
export const onUserConnect = () => {
  const uid = auth.currentUser.uid;
  const myConnectionsRef = ref(database, `users/${uid}/connected`);
  const lastOnlineRef = ref(database, `users/${uid}/lastOnline`);
  const connectedRef = ref(database, ".info/connected");
  onValue(connectedRef, snap => {
    if (snap.val() === true) {
      set(myConnectionsRef, true);
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

export const getSearchUserList = async (displayName: string) => {
  const uid = auth.currentUser.uid;
  const connectedRef = ref(database, "searchUsers");
  try {
    let userList: UserList[] = [];
    const response = await get(connectedRef);
    const users = Object.keys(response.val());
    users.forEach(user => {
      if (user === displayName) {
        let findUser = {
          uid: String(response.val()[user].uid),
          displayName: user,
          connected: response.val()[user].connected,
        };
        userList.push(findUser);
      }
    });

    return userList.length !== 0 ? userList[0] : "no data";
  } catch (error) {
    console.log(error);
  }
};
