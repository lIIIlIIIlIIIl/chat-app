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
  opponentUid: string;
  displayName: string;
  connected: boolean;
}

interface AddUserInfo {
  opponentUid: string;
  displayName: string;
}

// 로그인시 users에 저장됨
export const onUserConnect = () => {
  const uid = auth.currentUser.uid;
  const displayName = auth.currentUser.displayName;

  // allUsers
  const myConnectionsRef = ref(database, `users/${uid}/connected`);
  const lastOnlineRef = ref(database, `users/${uid}/lastOnline`);

  // searchUsers
  const searchUserConnectionsRef = ref(
    database,
    `searchUsers/${displayName}/connected`
  );
  const searchUserUidRef = ref(database, `searchUsers/${displayName}/uid`);
  const connectedRef = ref(database, ".info/connected");

  onValue(connectedRef, snap => {
    if (snap.val() === true) {
      set(myConnectionsRef, true);

      set(searchUserConnectionsRef, true);
      set(searchUserUidRef, uid);

      onDisconnect(myConnectionsRef).remove();
      onDisconnect(searchUserConnectionsRef).remove();
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
          opponentUid: user,
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

// 유저 검색하기
export const getSearchUserList = async (displayName: string) => {
  const connectedRef = ref(database, "searchUsers");
  try {
    let userList: UserList[] = [];
    const response = await get(connectedRef);
    const users = Object.keys(response.val());
    users.forEach(user => {
      if (user === displayName) {
        let findUser = {
          opponentUid: String(response.val()[user].uid),
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

// 내 유저 목록에 추가하기
export const userAddToMyUserList = (props: UserList) => {
  const uid = auth.currentUser.uid;
  const oppenentUidRef = ref(database, `userList/${uid}/${props.opponentUid}`);

  set(oppenentUidRef, { displayName: props.displayName });
};
