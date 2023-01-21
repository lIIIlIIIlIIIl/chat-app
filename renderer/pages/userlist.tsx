import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Aside from "../components/aside";
import FindUser from "../components/findUser";
import ChatModal from "../components/Modal/chatModal";
import UserItem from "../components/userItem";
import { getChats, getUserList } from "../services/database";
import { auth, database } from "../services/firebase";
import { addDoc, collection, getDoc, getFirestore } from "firebase/firestore";
import { getDatabase, ref } from "firebase/database";

export const userArr = [
  { nickname: "홍길동", message: "테스트중입니다" },
  { nickname: "안중근" },
  { nickname: "김구" },
];

const UserList = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    let userList = [];
    let list = getUserList("BcLpgBYVGBMl9lufoLbgXeBpc9v2")[0];
    for (let key in list) {
      let userItem = {
        uid: key,
        username: list[key].username,
        email: list[key].email,
      };
      userList.push(userItem);
    }
    setUsers(userList);
  }, []);

  return (
    <div className="w-screen h-screen flex ">
      <Aside />
      <div className="w-full h-full">
        <FindUser />
        <ul className="w-full h-[90%] pl-5 bg-[#F0F2F5] relative">
          {users
            ? users.map((el, idx) => (
                <UserItem key={idx} nickname={el.username} />
              ))
            : null}
          {/* <ChatModal title={""} member={0} /> */}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
