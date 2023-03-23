import { useAppDispatch, useAppSelector } from "../../helper/reduxHooks";
import ChatModal from "../../components/Modal/chatModal";
import { useEffect, useState } from "react";
import { getChatInfos, getChatRooms } from "../../services/chat";
import { modalActions } from "../../store/reducer/modalSlice";
import { chatActions } from "../../store/reducer/chatSlice";
import PersonalItem from "../../components/personalItem";

interface Chat {
  chat: { displayName: string; message: string; uid: string }[];
  uid?: string;
  user: string;
  roomUsers?: [];
}

const Personal = () => {
  const [chatList, setChatList] = useState<Chat[]>([]);
  const { isVisible } = useAppSelector(state => state.modal);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchChatData = async () => {
      const data = await getChatRooms();
      data.forEach(async el => {
        await getChatInfos(el.uid).then((res: Chat) => {
          Object.assign(res, { uid: el.uid });
          setChatList((prev: Chat[]) => [...prev, res]);
        });
      });
    };
    setChatList([]);

    fetchChatData();
  }, [isVisible]);

  const exitChatRoom = (): void => {
    dispatch(modalActions.closeModal());
    dispatch(chatActions.chatClose());
  };

  return (
    <div className="w-screen h-screen flex">
      {isVisible && <ChatModal exitChatRoom={exitChatRoom} />}

      {!isVisible && (
        <ul className="w-full h-full pl-5 bg-[#F0F2F5] overflow-y-auto">
          {chatList &&
            chatList.map((el: Chat, idx: number) => (
              <PersonalItem
                key={idx}
                nickname={Object.values(el.user)[0]}
                message={el.chat[el.chat.length - 1].message}
                audienceUid={el.uid}
                roomUsers={el.roomUsers}
              />
            ))}
        </ul>
      )}
    </div>
  );
};

export default Personal;
