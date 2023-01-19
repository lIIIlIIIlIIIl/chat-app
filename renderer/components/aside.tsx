import Link from "next/link";
import MenuButton from "./menubutton";

const menuArr = [
  { text: "유저 목록", title: "userList", href: "/userlist" },
  { text: "채팅", title: "personal", href: "/personal" },
  { text: "그룹 채팅", title: "group", href: "/group" },
];

const Aside = () => {
  return (
    <aside className="bg-[#5b21b6] w-1/6 h-full">
      <div className="">
        {menuArr.map((el, idx) => (
          <MenuButton text={el.text} key={idx} href={el.href} />
        ))}
      </div>
    </aside>
  );
};

export default Aside;
