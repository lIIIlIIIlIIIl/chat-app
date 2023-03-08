import { useEffect, useState } from "react";
import Aside from "../components/aside";
import SearchModal from "../components/Modal/searchModal";
import UserItem from "../components/userItem";
import { getUserOnline } from "../services/userStatus";

interface Users {
  connected: boolean | undefined;
  displayName: string;
  opponentUid: string;
}

const UserList = () => {
  const [userList, setuserList] = useState<Users[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const { userList } = await getUserOnline();
      setuserList(userList);
    };
    fetchUserData();
  }, []);

  const searchModalOnClickHandler = () => {
    setIsModalOpen(prev => !prev);
  };
  return (
    <div className="w-screen h-screen flex">
      <Aside />
      <div className="w-full h-full bg-[#F0F2F5] relative">
        {isModalOpen && (
          <SearchModal
            searchModalOnClickHandler={searchModalOnClickHandler}
            isModalOpen={isModalOpen}
          />
        )}
        <div className="absolute bottom-12 right-10 z-10">
          <button
            className="bg-white w-16 h-16 rounded-full"
            onClick={searchModalOnClickHandler}
          >
            친구 추가
          </button>
        </div>
        <ul className="w-full h-full pl-5 overflow-y-auto">
          {userList &&
            userList.map((el: Users, idx: number) => (
              <UserItem
                key={idx}
                nickname={el.displayName}
                audienceUid={el.opponentUid}
                connected={el.connected}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
