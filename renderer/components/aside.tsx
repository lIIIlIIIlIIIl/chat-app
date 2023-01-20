import { useRouter } from "next/router";
import { logoutFuc } from "../services/auth";
import MenuButton from "./menubutton";

const menuArr = [
  { text: "유저 목록", title: "userList", path: "/userlist" },
  { text: "채팅", title: "personal", path: "/personal" },
  { text: "그룹 채팅", title: "group", path: "/group" },
];

const Aside = () => {
  const router = useRouter();
  const onClickHandler = async () => {
    try {
      await logoutFuc().then(res => {
        router.push("/home");
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <aside className="bg-[#0e0b53] w-1/6 h-full">
      <ul>
        {menuArr.map((el, idx) => (
          <MenuButton text={el.text} key={idx} path={el.path} />
        ))}
      </ul>
      <div
        className="w-full h-20 flex items-center justify-center cursor-pointer"
        onClick={onClickHandler}
      >
        <span className="text-white" onClick={onClickHandler}>
          로그아웃
        </span>
      </div>
    </aside>
  );
};

export default Aside;
