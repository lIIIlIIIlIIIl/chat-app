import { useEffect, useState } from "react";
import Aside from "../components/aside";
import GroupItem from "../components/groupItem";
import ChatModal from "../components/Modal/chatModal";
import GroupChatModal from "../components/Modal/groupChatModal";
import InviteModal from "../components/Modal/inviteModal";
import UserItem from "../components/userItem";
import { useAppDispatch, useAppSelector } from "../helper/reduxHooks";
import {
  getChatRooms,
  getGroupChatInfos,
  startGroupChat,
} from "../services/chat";
import { getUserOnline } from "../services/userStatus";
import { groupActions } from "../store/reducer/groupSlice";
import { modalActions } from "../store/reducer/modalSlice";

interface Users {
  uid: string;
  displayName: string;
}

export interface RoomUsers extends Array<Users> {}

const Group = () => {
  const [chatList, setChatList] = useState([]);
  const [roomUsers, setRoomUsers] = useState<RoomUsers>([]);
  const [roomState, setRoomState] = useState(false);
  const [roomInfo, setRoomInfo] = useState({});
  const { isVisible } = useAppSelector(state => state.modal);
  const { inviteView } = useAppSelector(state => state.modal);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchChatData = async () => {
      getChatRooms().then(res => {
        let roomId = res.filter(el => el.roomId.includes("groupchat"));
        roomId.map(async el => {
          await getGroupChatInfos(el.uid).then(res => {
            Object.assign(res, { uid: el.uid });
            setChatList(prev => [...prev, res]);
          });
        });
      });
    };
    fetchChatData();
  }, []);

  const exitChatRoom = () => {
    dispatch(modalActions.closeModal());
    dispatch(groupActions.endGroupInfo());
  };

  const btnHandler = async () => {
    const { userList } = await getUserOnline();
    setRoomUsers(userList);
  };

  return (
    <div className="w-screen h-screen flex">
      <Aside />
      {isVisible && <GroupChatModal exitChatRoom={exitChatRoom} />}

      {!isVisible && (
        <div className="w-full h-full bg-[#F0F2F5] relative">
          {inviteView && <InviteModal roomUsers={roomUsers} />}

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
            {chatList.map((el, idx) => (
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
      )}
    </div>
  );
};

export default Group;
