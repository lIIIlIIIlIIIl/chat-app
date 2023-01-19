import Aside from "../components/aside";
import UserItem from "../components/userItem";
import { userArr } from "./userlist";

const Personal = () => {
  return (
    <div className="w-screen h-screen flex">
      <Aside />
      <ul className="w-full h-full pl-5 bg-[#F0F2F5]">
        {userArr.map((el, idx) => (
          <UserItem key={idx} nickname={el.nickname} message={el.message} />
        ))}
      </ul>
    </div>
  );
};

export default Personal;
