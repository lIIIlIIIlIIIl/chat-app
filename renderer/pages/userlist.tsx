import { useEffect, useState } from "react";
import Aside from "../components/aside";
import UserItem from "../components/userItem";
import { getUserOnline } from "../services/userStatus";

interface Users {
  connected: boolean | undefined;
  displayName: string;
  uid: string;
}

const UserList = () => {
  const [userList, setuserList] = useState<Users[]>([]);

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
          {userList &&
            userList.map((el: Users, idx: number) => (
              <UserItem
                key={idx}
                nickname={el.displayName}
                audienceUid={el.uid}
                connected={el.connected}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};

export default UserList;
