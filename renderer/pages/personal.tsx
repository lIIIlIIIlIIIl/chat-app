import Aside from "../components/aside";
import UserItem from "../components/userItem";
import { useAppDispatch, useAppSelector } from "../helper/reduxHooks";
import ChatModal from "../components/Modal/chatModal";
import { useEffect, useState } from "react";
import { getChatInfos, getChatRooms } from "../services/chat";
import { modalActions } from "../store/reducer/modalSlice";
import { chatActions } from "../store/reducer/chatSlice";
import PersonalItem from "../components/personalItem";
import { useRouter } from "next/router";

const Personal = () => {
  const [chatList, setChatList] = useState([]);
  const { isVisible } = useAppSelector(state => state.modal);

  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchChatData = async () => {
      const data = await getChatRooms();
      data.forEach(async el => {
        // el.uid는 랜덤 채팅이름
        await getChatInfos(el.uid).then(res => {
          Object.assign(res, { uid: el.uid });
          setChatList(prev => [...prev, res]);
        });
      });
    };
    fetchChatData();
  }, []);

  const exitChatRoom = () => {
    dispatch(modalActions.closeModal());
    dispatch(chatActions.chatClose());
    router.push("/personal");
  };

  return (
    <div className="w-screen h-screen flex">
      <Aside />
      {isVisible && <ChatModal exitChatRoom={exitChatRoom} />}

      {!isVisible && (
        <ul className="w-full h-full pl-5 bg-[#F0F2F5] overflow-y-auto">
          {chatList.length !== 0 ? (
            chatList.map((el, idx) => (
              <PersonalItem
                key={idx}
                nickname={Object.values(el.user)[0]}
                message={el.chat[el.chat.length - 1].message}
                audienceUid={el.uid}
                roomUsers={el.roomUsers}
              />
            ))
          ) : (
            <div>채팅 목록이 비어있습니다.</div>
          )}
        </ul>
      )}
    </div>
  );
};

export default Personal;
