import { ref, onValue, push, child, update, set } from "firebase/database";
import { auth, database } from "./firebase";

interface Data {
  message: string;
  timestamp: string;
  userId: string;
}

export const sendChat = (data: Data) => {
  const postData = {
    message: data.message,
    timestamp: data.timestamp,
    uid: data.userId,
  };
  const newPostKey = push(child(ref(database), "user")).key;
  const updates = {};
  updates["user/" + newPostKey] = postData;
  return update(ref(database), updates);
};

export const getChats = (userId: string) => {
  let chats = [];
  const starCountRef = ref(database, "user");
  onValue(starCountRef, snapshot => {
    const data = snapshot.val();
    chats.push(data);
  });
  return chats;
};

//회원가입 시 만들어짐
export const usersInfoDB = (email: string, nickname: string) => {
  const uid = auth.currentUser.uid;
  const userEmailRef = ref(database, `users/${uid}/email`);
  const userNicknameRef = ref(database, `users/${uid}/displayName`);
  const userConnectionsRef = ref(database, `users/${uid}/connected`);

  set(userEmailRef, email);
  set(userNicknameRef, nickname);
  set(userConnectionsRef, false);
  // 성별 들어가기
};

export const searchData = (displayName: string) => {
  const uid = auth.currentUser.uid;

  const searchUserUidRef = ref(database, `searchUsers/${displayName}/uid`);
  const searchUserConnectionsRef = ref(
    database,
    `searchUsers/${displayName}/connected`
  );

  set(searchUserUidRef, uid);
  set(searchUserConnectionsRef, false);
};

export const getUserList = (userId: string) => {
  let userList = [];
  const starCountRef = ref(database, "PersonalUsers");
  onValue(starCountRef, snapshot => {
    const data = snapshot.val();
    for (let user in data) {
      if (user === userId) {
        userList.push(data[user]);
      }
    }
  });
  return userList;
};
