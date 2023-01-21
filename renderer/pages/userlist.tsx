import { useRouter } from "next/router";
import { useEffect } from "react";
import Aside from "../components/aside";
import ChatModal from "../components/Modal/chatModal";
import UserItem from "../components/userItem";
import { auth } from "../services/firebase";

export const userArr = [
  { nickname: "홍길동", message: "테스트중입니다" },
  { nickname: "안중근" },
  { nickname: "김구" },
];

const UserList = () => {
  const router = useRouter();

  useEffect(() => {
    console.log("123");
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log(user);
      }
      if (!user) {
        // router.push("/home");
      }
    });
  }, []);

  return (
    <div className="w-screen h-screen flex ">
      <Aside />
      <ul className="w-full h-full pl-5 bg-[#F0F2F5] relative">
        {userArr.map((el, idx) => (
          <UserItem key={idx} nickname={el.nickname} message={el.message} />
        ))}
        <ChatModal title={""} member={0} />
      </ul>
    </div>
  );
};

export default UserList;
