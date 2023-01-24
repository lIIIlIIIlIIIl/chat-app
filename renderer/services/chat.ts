import { push, set, ref, get, onValue } from "@firebase/database";
import { auth, database } from "./firebase";

interface ChattingList {
  roomId: string;
  uid: string;
}
interface ChatInfo {
  user: string;
  chat: retrunType[];
  roomUsers: [];
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
      Date.now().toString(36) + Math.random().toString(36).slice(2);
    const chatRoomRef = ref(database, `oneOnOneChatRooms/${randomRoomID}`);
    set(myChatRoomWithOppoent, randomRoomID);
    set(opponentChatRoom, randomRoomID);
    const opponent = {};
    const me = {};
    opponent[opponentUID] = oppenentName.val();
    me[uid] = displayName;
    set(chatRoomRef, { users: [opponent, me], chat: ["chat start"] });
    return randomRoomID;
  }
};

// 여기서 채팅방 이름으로 랜더링하도록 만들기
export const getChatRooms = async () => {
  let result: ChattingList[] = [];
  const uid = auth.currentUser.uid;
  const myChatRoomRef = ref(database, `usersChatRoom/${uid}`);
  const myChatRoom = await get(myChatRoomRef);
  for (let key in myChatRoom.val()) {
    // key : 유저의 uid
    result.push({ roomId: key, uid: myChatRoom.val()[key] });
  }
  // result : 채팅방의 랜덤 이름들
  return result;
};

export const getChatInfos = async uid => {
  // uid : 채팅방 랜덤 이름
  let result: ChatInfo = { user: "", chat: [], roomUsers: [] };
  const myName = auth.currentUser.displayName;
  const myUID = auth.currentUser.uid;
  const chatRoomRef = ref(database, `oneOnOneChatRooms/${uid}`); // 채팅방 이름
  // console.log(await (await get(chatRoomRef)).ref.key); 채팅방의 이름
  const chatRoomInfo = await (await get(chatRoomRef)).val(); //  해당 채팅방

  result.chat = chatRoomInfo.chat;
  result.roomUsers = chatRoomInfo.users;
  for (let user in chatRoomInfo.users) {
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

// ------------------------
// ------------------------

export const startGroupChat = opponentUIDs => {
  const roomUserList = [];
  const me = {};

  // 채팅방 이름 랜덤으로 생성
  const randomRoomID =
    Date.now().toString(36) + Math.random().toString(36).slice(2);
  const randomString = "groupchat" + Math.random().toString(36).slice(2);

  //userChatRoom -> 내 uid -> GroupChat-randomNumber -> 채팅방 이름
  const uid = auth.currentUser.uid;
  const displayName = auth.currentUser.displayName;
  const myChatRoomRef = ref(database, `usersChatRoom/${uid}/${randomString}`);
  set(myChatRoomRef, randomRoomID);

  //userChatRoom -> 초대된 유저 uid -> GroupChat-randomNumber -> 채팅방 이름
  opponentUIDs.map(el => {
    const oppenent = {};
    oppenent[el.uid] = el.displayName;
    roomUserList.push(oppenent);
    // el.uid
    const opponentChatRoomRef = ref(
      database,
      `usersChatRoom/${el.uid}/${randomString}`
    );
    set(opponentChatRoomRef, randomRoomID);
  });

  //groupChatRooms -> 채팅방 uid -> 채팅, 유저목록 생성
  const chatRoomRef = ref(database, `groupChatRooms/${randomRoomID}`);
  me[uid] = displayName;
  roomUserList.push(me);

  set(chatRoomRef, { users: roomUserList, chat: ["chat start"] });
  return randomRoomID;
};

export const getGroupChatInfos = async roomId => {
  let result = { room: "", chat: [], roomUsers: [], userDisplayName: [] };

  const chatRoomRef = ref(database, `groupChatRooms/${roomId}`);
  const chatRoomInfo = await (await get(chatRoomRef)).val();

  const countUsers = chatRoomInfo.users.length;
  const users = chatRoomInfo.users.map(el => Object.keys(el));

  result.chat = chatRoomInfo.chat;
  result.roomUsers = chatRoomInfo.users;
  result.room = "그룹 채팅방";
  result.userDisplayName = users;

  return result;
};

export const startGroupChatRoom = async chatRoomUID => {
  const chatMessageRef = ref(database, `groupChatRooms/${chatRoomUID}/chat`);

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

  const chatMessageRef = ref(database, `groupChatRooms/${chatRoomUID}/chat`);
  const chat = await get(chatMessageRef);
  set(chatMessageRef, [
    ...chat.val(),
    { message: message, uid: uid, displayName: displayName },
  ]);

  const lastChatMessageRef = ref(
    database,
    `groupChatRooms/${chatRoomUID}/lastChatUpdate`
  );

  set(lastChatMessageRef, {
    message: message,
    writerUID: uid,
    displayName: displayName,
  });
};

/*
초대하기

초대 버튼 클릭 시 맴버를 해당 채팅방 맴버리스트에 추가히기 - 업데이트

기존 방의 roomId 변경
방의 맴버 추가
추가된 맴버의 유저 채팅 룸 추가


정리하기
oneonone -> 랜덤 채팅방 이름으로 나눠져 있음
userChatRoom -> 각자 uid로 나눠짐 -> 상대방의 uid : 랜덤 채팅방 이름

*/

/*
userChatRoom
  - uid
    - Group(rnadeomaNumber) : 랜덤 채팅방이름
*/
