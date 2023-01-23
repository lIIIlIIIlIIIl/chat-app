import { push, set, ref, get, onValue } from "@firebase/database";
import { auth, database } from "./firebase";

interface ChattingList {
  uid: string;
}
interface ChatInfo {
  user: string;
  chat: retrunType[];
}
type retrunType = {
  message: string;
  uid: string;
  displayName: string;
};
export const startChat = async opponentUID => {
  const uid = auth.currentUser.uid;
  const displayName = auth.currentUser.displayName;
  const myChatRoom = ref(database, `usersChatRoom/${uid}`);
  const myChatRoomWithOppoent = ref(
    database,
    `usersChatRoom/${uid}/${opponentUID}`
  );
  const opponentChatRoom = ref(database, `usersChatRoom/${opponentUID}/${uid}`);
  const oppenentNameRef = ref(database, `users/${opponentUID}/displayName`);
  const oppenentName = await get(oppenentNameRef);
  let hasRoom = false;
  const myList = await get(myChatRoom);
  for (let key in myList.val()) {
    if (key === opponentUID) {
      hasRoom = true;
      break;
    }
  }
  if (hasRoom) {
    const roomID = await get(myChatRoomWithOppoent);
    return roomID.val();
  } else {
    const randomRoomID =
      Date.now().toString(36) + Math.random().toString(36).substr(2);
    const chatRoomRef = ref(database, `oneOnOneChatRooms/${randomRoomID}`);
    set(myChatRoomWithOppoent, randomRoomID);
    set(opponentChatRoom, randomRoomID);
    // set(chatRoomRef, ["test"]);
    const opponent = {};
    const me = {};
    opponent[opponentUID] = oppenentName.val();
    me[uid] = displayName;
    set(chatRoomRef, { users: [opponent, me], chat: ["chat start"] });
    return randomRoomID;
  }
};

export const getChatRooms = async () => {
  let result: ChattingList[] = [];
  const uid = auth.currentUser.uid;
  const myChatRoomRef = ref(database, `usersChatRoom/${uid}`);
  const myChatRoom = await get(myChatRoomRef);
  for (let key in myChatRoom.val()) {
    result.push({ uid: myChatRoom.val()[key] });
  }
  return result;
};

export const getChatInfos = async uid => {
  let result: ChatInfo = { user: "", chat: [] };
  const myName = auth.currentUser.displayName;
  const myUID = auth.currentUser.uid;
  const chatRoomRef = ref(database, `oneOnOneChatRooms/${uid}`);
  const chatRoomInfo = await (await get(chatRoomRef)).val();
  // Object.assign(result, { chat: chatRoomInfo.chat});
  result.chat = chatRoomInfo.chat;
  for (let user in chatRoomInfo.users) {
    // if(chatRoomInfo.users[user] !== myName) Object.assign(result, { user: chatRoomInfo.users[user] })
    if (Object.keys(chatRoomInfo.users[user])[0] !== myUID)
      result.user = chatRoomInfo.users[user];
  }
  return result;
};

export const startChatRoom = async chatRoomUID => {
  const chatMessageRef = ref(database, `oneOnOneChatRooms/${chatRoomUID}/chat`);

  onValue(chatMessageRef, snap => {
    let selectionFired = new CustomEvent(`message/${chatRoomUID}`, {
      detail: snap.val(),
    });
    window.dispatchEvent(selectionFired);
  });
};

export const sendChat = async (chatRoomUID, message) => {
  const uid = auth.currentUser.uid;
  const displayName = auth.currentUser.displayName;
  const chatMessageRef = ref(database, `oneOnOneChatRooms/${chatRoomUID}/chat`);
  const chat = await get(chatMessageRef);
  if (chat.val()) {
    set(chatMessageRef, [
      ...chat.val(),
      { message: message, uid: uid, displayName: displayName },
    ]);
  } else {
    set(chatMessageRef, [
      { message: message, uid: uid, displayName: displayName },
    ]);
  }
};

export const getGroupChatRooms = async () => {
  const groupChatRef = ref(database, "groupChatRooms");
  return await (await get(groupChatRef)).val();
};

export const getGroupChatInfos = async () => {};

export const startGroupChat = async chatRoomUID => {
  const chatRoomRef = ref(database, `groupChatRooms/${chatRoomUID}`);
  const chatMessageRef = ref(
    database,
    `groupChatRooms/${chatRoomUID}/lastChatUpdate`
  );

  onValue(chatMessageRef, snap => {
    let selectionFired = new CustomEvent(`message/${chatRoomUID}`, {
      detail: snap.val(),
    });
    window.dispatchEvent(selectionFired);
  });
};

export const sendGroupChat = async (chatRoomUID, message) => {
  const uid = auth.currentUser.uid;
  const displayName = auth.currentUser.displayName;
  const chatMessageRef = ref(
    database,
    `groupChatRooms/${chatRoomUID}/lastChatUpdate`
  );

  set(chatMessageRef, {
    message: message,
    writerUID: uid,
    displayName: displayName,
  });
};
