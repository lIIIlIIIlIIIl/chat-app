import { useRouteTo } from "../hooks/useRouter";
import { logoutFuc } from "../services/auth";
import MenuButton from "./menubutton";

interface MenuData {
  id: number;
  label: string;
  title: string;
  path: string;
}

const menuData = [
  { id: 0, label: "유저 목록", title: "userList", path: "/userlist" },
  { id: 1, label: "채팅", title: "personal", path: "/personal" },
  { id: 2, label: "그룹 채팅", title: "group", path: "/group" },
];

const Sidbar = () => {
  const { routeTo } = useRouteTo();

  const onClickHandler = async () => {
    await logoutFuc();
    routeTo("/home");
  };

  return (
    <aside className="bg-[#0e0b53] h-full w-full">
      <ul>
        {menuData.map((el: MenuData) => (
          <MenuButton label={el.label} key={el.id} path={el.path} />
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

export default Sidbar;
