import { useEffect, useState } from "react";
import GroupItem from "../../components/groupItem";
import InviteModal from "../../components/Modal/inviteModal";
import { useAppDispatch, useAppSelector } from "../../helper/reduxHooks";
import { getGroupChatInfos, getGroupChatRooms } from "../../services/chat";
import { getMyUserList } from "../../services/userStatus";
import { modalActions } from "../../store/reducer/modalSlice";

export interface Users {
  uid: string;
  displayName: string;
}

interface Chat {
  chat: { displayName: string; message: string; uid: string }[];
  room: string;
  roomUsers: [];
  uid?: string;
  userDisplayName: string[];
}

interface ChatRoom {
  roomId: string;
  uid: string;
}

interface UserInfo {
  opponentUid: string;
  displayName: string;
}

export interface RoomUsers extends Array<Users> {}

const Group = () => {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [users, setUsers] = useState<UserInfo[]>([]);

  const { inviteView } = useAppSelector(state => state.modal);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchChatData = async () => {
      getGroupChatRooms().then((res: ChatRoom[]) => {
        let roomId = res.filter(el => el.roomId.includes("groupchat"));
        roomId.map(async el => {
          await getGroupChatInfos(el.uid).then((res: Chat) => {
            Object.assign(res, { uid: el.uid });
            setChatList((prev: Chat[]) => [...prev, res]);
          });
        });
      });
    };

    const fetchUserData = async () => {
      const response = await getMyUserList();

      if (!response) return;

      setUsers(response.userList);
    };

    fetchUserData();
    fetchChatData();
  }, []);

  const btnHandler = async () => {
    // const { userList } = await getUserOnline();
    // setRoomUsers(userList);
  };

  return (
    <div className="w-full h-full flex">
      <div className="w-full h-full bg-[rgb(240,242,245)] relative">
        {inviteView && <InviteModal users={users} />}

        <div className="w-full h-[10%] flex justify-end pr-5">
          <button
            onClick={() => {
              dispatch(modalActions.inviteModalOpen());
            }}
          >
            그룹 채팅 만들기
          </button>
        </div>
        <ul className="w-full h-[90%] pl-5 bg-[#F0F2F5]">
          {chatList.map((el: Chat, idx: number) => (
            <GroupItem
              key={idx}
              roomName={el.room}
              message={el.chat[el.chat.length - 1].message}
              roomUid={el.uid}
              roomUsers={el.roomUsers}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Group;
