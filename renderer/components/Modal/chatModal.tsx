import { useEffect, useState } from "react";
import { getChats } from "../../services/database";
import { auth } from "../../services/firebase";
import ChatForm from "./chatForm";
import { database } from "../../services/firebase";
import { ref } from "firebase/database";

interface Props {
  title: string;
  member: number;
}

const ChatModal = (props: Props) => {
  const [chats, setChats] = useState([]);
  const getChatList = () => {
    let data = { userId: auth.currentUser.uid };
    const chatList = getChats(data);
    setChats(chatList);
  };

  useEffect(() => {
    try {
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className="w-full h-full boder-2 bg-[#F0F2F5] absolute left-0 top-0">
      <div className="w-[60%] h-full m-auto bg-[#051525]">
        <div className="w-full h-[10%] border-2">
          <div></div>
          <div></div>
        </div>
        <div className="w-full h-[70%] border-2"></div>
        <div className="w-full h-[20%] border-2">
          <ChatForm />
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
