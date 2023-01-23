import Aside from "../components/aside";
import UserItem from "../components/userItem";
import { userArr } from "./userlist";
import { useAppDispatch, useAppSelector } from "../helper/reduxHooks";
import ChatModal from "../components/Modal/chatModal";
import { useEffect, useState } from "react";
import { getChatInfos, getChatRooms } from "../services/chat";
import { modalActions } from "../store/reducer/modalSlice";
import { chatActions } from "../store/reducer/chatSlice";

const Personal = () => {
  const { roomId, displayName } = useAppSelector(state => state.chat);
  const [chatList, setChatList] = useState([]);

  const { isVisible } = useAppSelector(state => state.modal);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchChatData = async () => {
      const data = await getChatRooms();
      data.forEach(async el => {
        await getChatInfos(el.uid).then(res => {
          Object.assign(res, { uid: el.uid });
          setChatList(prev => [...prev, res]);
        });
      });
    };
    fetchChatData();

    // if (
    //   roomId !== undefined &&
    //   roomId !== "" &&
    //   displayName !== undefined &&
    //   displayName !== ""
    // ) {
    //   dispatch(roomActions.startRoomInfo({ roomId, displayName }));
    // }
  }, []);

  const exitChatRoom = () => {
    dispatch(modalActions.closeModal());
    dispatch(
      chatActions.chatOpen({
        roomId: "",
        displayName: "",
      })
    );
  };

  console.log(chatList);

  return (
    <div className="w-screen h-screen flex">
      <Aside />
      {isVisible && <ChatModal exitChatRoom={exitChatRoom} />}

      {!isVisible && (
        <ul className="w-full h-full pl-5 bg-[#F0F2F5] scroll-y">
          {chatList &&
            chatList.map((el, idx) => (
              <UserItem
                key={idx}
                nickname={Object.values(el.user)[0]}
                message={el.chat[el.chat.length - 1].message}
                audienceUid={el.uid}
              />
            ))}
        </ul>
      )}
    </div>
  );
};

export default Personal;
