import { useEffect, useState } from "react";
import Aside from "../components/aside";
import UserItem from "../components/userItem";
import { getGroupChatRooms } from "../services/chat";
import { userArr } from "./userlist";

const Group = () => {
  const [chatList, setChatList] = useState([]);
  const [roomState, setRoomState] = useState(false);
  const [roomInfo, setRoomInfo] = useState({});

  useEffect(() => {
    const fetchChatData = async () => {
      getGroupChatRooms().then(res => {
        for (let key in res) {
          setChatList(prev => [...prev, Object.assign(res[key], { uid: key })]);
        }
      });
    };
    fetchChatData();
  }, []);
  return (
    <div className="w-screen h-screen flex">
      <Aside />
      <ul className="w-full h-full pl-5 bg-[#F0F2F5]">
        {/* {userArr.map((el, idx) => (
          <UserItem key={idx} nickname={el.nickname} message={el.message} />
        ))} */}
      </ul>
    </div>
  );
};

export default Group;
