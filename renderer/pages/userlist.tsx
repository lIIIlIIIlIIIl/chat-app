import { useEffect, useState } from "react";
import Aside from "../components/aside";
import SearchModal from "../components/Modal/searchModal";
import UserItem from "../components/userItem";
import { getMyUserList } from "../services/userStatus";

interface UserList {
  opponentUid: string;
  displayName: string;
}

const UserList = () => {
  const [userList, setuserList] = useState<UserList[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const response = await getMyUserList();

      if (!response) return;

      setuserList(response.userList);
    };
    fetchUserData();
  }, [isModalOpen]);

  const searchModalOnClickHandler = () => {
    setIsModalOpen(prev => !prev);
  };

  const deleteUserFormUserList = (opponentUid: string) => {
    const fileterUserList = userList.filter(
      (user: UserList) => user.opponentUid !== opponentUid
    );
    setuserList(fileterUserList);
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
        {userList.length === 0 ? (
          <div className="w-full h-[10%] p-5">
            <span>등록된 유저가 없습니다.</span>
          </div>
        ) : (
          <ul className="w-full h-full pl-5 pr-5 overflow-y-auto">
            {userList &&
              userList.map((el: UserList, idx: number) => (
                <UserItem
                  key={idx}
                  nickname={el.displayName}
                  audienceUid={el.opponentUid}
                  deleteUserFormUserList={deleteUserFormUserList}
                />
              ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default UserList;
