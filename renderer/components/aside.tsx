import Link from "next/link";

const menuArr = [
  { text: "유저 목록", title: "userList" },
  { text: "개인 채팅", title: "personal" },
  { text: "그룹 채팅", title: "group" },
];

const Aside = () => {
  return (
    <aside className="bg-gray-900 w-1/6 ">
      <div className="w-full h-10 text-white">유저 목록</div>
      <div>개인 채팅</div>
      <div>그룹 채팅</div>
      <div className="bg-white w-5/6">
        <Link href="/login" className="bg-gray-900 text-white">
          loginPage
        </Link>
      </div>
    </aside>
  );
};

export default Aside;
