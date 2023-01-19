import Link from "next/link";
import MenuButton from "./menubutton";

const menuArr = [
  { text: "유저 목록", title: "userList", path: "/userlist" },
  { text: "채팅", title: "personal", path: "/personal" },
  { text: "그룹 채팅", title: "group", path: "/group" },
];

const Aside = () => {
  return (
    <aside className="bg-[#0e0b53] w-1/6 h-full">
      <ul className="border-2">
        {menuArr.map((el, idx) => (
          <MenuButton text={el.text} key={idx} path={el.path} />
        ))}
      </ul>
    </aside>
  );
};

export default Aside;
