import { useEffect, useState } from "react";
import { useAppDispatch } from "../../helper/reduxHooks";
import { RoomUsers, Users } from "../../pages/group";
import { startGroupChat } from "../../services/chat";
import { getUserOnline } from "../../services/userStatus";
import { modalActions } from "../../store/reducer/modalSlice";

interface Props {
  roomUsers: RoomUsers;
}
interface Item {
  uid: string;
  displayName: string;
  connected: boolean;
}

interface UserList {
  connected: boolean;
  displayName: string;
  uid: string;
}

const InviteModal = ({ roomUsers }: Props) => {
  const [filterUsers, setFilterUsers] = useState<UserList[]>([]);
  const [checkedList, setCheckedList] = useState<UserList[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchUserData = async () => {
      const roomList = [];
      roomUsers.map((el: Users) => {
        roomList.push(Object.keys(el)[0]);
      });
      const { userList } = await getUserOnline();
      userList.map((el: UserList) => {
        if (!roomList.includes(String(Object.keys(el.uid)))) {
          setFilterUsers(prev => [...prev, el]);
        }
      });
    };
    fetchUserData();
  }, []);

  const checkedItemHandler = (isChecked: boolean, value: Item): void => {
    if (isChecked) {
      setCheckedList(prev => [...prev, value]);
      return;
    }
    if (!isChecked && checkedList.includes(value)) {
      setCheckedList(checkedList.filter(el => el !== value));
      return;
    }
    return;
  };

  const checkHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    item: Item
  ): void => {
    setIsChecked(!isChecked);
    checkedItemHandler(e.target.checked, item);
  };

  const cancellClickHandler = (): void => {
    dispatch(modalActions.inviteModalClose());
  };

  const inviteClickHandler = async () => {
    startGroupChat(checkedList);
    dispatch(modalActions.inviteModalClose());
  };

  return (
    <div className="bg-white absolute top-[50px] right-2 w-32 h-[50%] rounded-[9px] p-3 flex-col justify-between">
      <div className="h-[90%] overflow-y-auto">
        {filterUsers &&
          filterUsers.map((el: Item, index: number) => (
            <div key={index} className="w-full flex mb-4">
              <div>
                <input type="checkbox" onChange={e => checkHandler(e, el)} />
              </div>
              <div className="pl-3">
                <span>{el.displayName}</span>
              </div>
            </div>
          ))}
      </div>
      <div className="w-full flex justify-between">
        <button
          className="bg-[#0940af] text-white rounded-[8px]"
          onClick={cancellClickHandler}
        >
          ??????
        </button>
        <button
          className="bg-[#0940af] text-white rounded-[8px]"
          onClick={inviteClickHandler}
        >
          ??????
        </button>
      </div>
    </div>
  );
};

export default InviteModal;
