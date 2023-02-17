import { ref, onValue, push, child, update } from "firebase/database";
import { database } from "./firebase";

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

export const signupDB = (email: string, nickname: string) => {
  const postData = {
    email: email,
    username: nickname,
  };
  const newPostKey = push(child(ref(database), "Users")).key;
  const updates = {};
  updates["Users/" + newPostKey] = postData;
  return update(ref(database), updates);
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
