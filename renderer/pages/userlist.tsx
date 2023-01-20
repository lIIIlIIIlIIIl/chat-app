import Aside from "../components/aside";
import ChatModal from "../components/Modal/chatModal";
import UserItem from "../components/userItem";

export const userArr = [
  { nickname: "홍길동", message: "테스트중입니다" },
  { nickname: "안중근" },
  { nickname: "김구" },
];

const UserList = () => {
  return (
    <div className="w-screen h-screen flex ">
      <Aside />
      <ul className="w-full h-full pl-5 bg-[#F0F2F5] relative">
        {userArr.map((el, idx) => (
          <UserItem key={idx} nickname={el.nickname} message={el.message} />
        ))}
        {/* <ChatModal /> */}
      </ul>
    </div>
  );
};

export default UserList;
