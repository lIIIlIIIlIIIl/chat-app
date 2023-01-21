import { ref, set, onValue } from "firebase/database";
import { database } from "./firebase";

export const sendChat = data => {
  set(ref(database, "user/" + data.userId), {
    message: data.message,
    timestamp: data.timestamp,
    uid: data.userId,
  });
};

export const getChats = data => {
  let chats = [];
  const starCountRef = ref(database, "user/" + data.userId);
  onValue(starCountRef, snapshot => {
    const data = snapshot.val();
    chats.push(data);
  });
  return chats;
};
