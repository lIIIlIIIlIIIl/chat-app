import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Aside from "../components/aside";
import FindUser from "../components/findUser";
import UserItem from "../components/userItem";
import { getUserList } from "../services/database";
import { auth } from "../services/firebase";
import { getUserOnline } from "../services/userStatus";

export const userArr = [
  { nickname: "홍길동", message: "테스트중입니다" },
  { nickname: "안중근" },
  { nickname: "김구" },
];

const UserList = () => {
  const router = useRouter();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await getUserOnline();
      console.log(data);
      setUsers(data);
    };
    fetchUserData();
  }, []);

  return (
    <div className="w-screen h-screen flex ">
      <Aside />
      <div className="w-full h-full">
        <ul className="w-full h-full pl-5 bg-[#F0F2F5] ">
          {users
            ? users.map((el, idx) => (
                <UserItem
                  key={idx}
                  nickname={el.displayName}
                  audienceUid={el.uid}
                />
              ))
            : null}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
