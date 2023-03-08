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

interface UserInfo {
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
          opponentUid: response.val()[user].uid as string,
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
  const opponentUidRef = ref(database, `userList/${uid}/${props.opponentUid}`);

  set(opponentUidRef, { displayName: props.displayName });
};

// 내 유저 목록 불러오기
export const getMyUserList = async () => {
  const uid = auth.currentUser.uid;
  const myUserList = ref(database, `userList/${uid}`);

  try {
    const userList: UserInfo[] = [];
    const response = await (await get(myUserList)).val();
    const users = Object.keys(response);
    users.forEach(user => {
      let findUser = {
        opponentUid: user,
        displayName: response[user].displayName as string,
      };
      userList.push(findUser);
    });

    return { userList };
  } catch (error) {
    console.log(error);
  }
};
