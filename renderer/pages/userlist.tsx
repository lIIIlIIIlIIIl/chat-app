import { useEffect, useState } from "react";
import Aside from "../components/aside";
import UserItem from "../components/userItem";
import { getUserOnline } from "../services/userStatus";

const UserList = () => {
  const [userList, setuserList] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      const { userList } = await getUserOnline();
      setuserList(userList);
    };
    fetchUserData();
  }, []);
  return (
    <div className="w-screen h-screen flex ">
      <Aside />
      <div className="w-full h-full">
        <ul className="w-full h-full pl-5 bg-[#F0F2F5] overflow-y-auto">
          {userList
            ? userList.map((el, idx) => (
                <UserItem
                  key={idx}
                  nickname={el.displayName}
                  audienceUid={el.uid}
                  connected={el.connected}
                />
              ))
            : null}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
