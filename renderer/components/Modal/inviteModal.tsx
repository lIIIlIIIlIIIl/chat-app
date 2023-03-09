import { useState } from "react";
import { useAppDispatch } from "../../helper/reduxHooks";
import { RoomUsers, Users } from "../../pages/group";
import { startGroupChat } from "../../services/chat";
import { modalActions } from "../../store/reducer/modalSlice";

interface Props {
  users: UserInfo[];
}

interface UserInfo {
  opponentUid: string;
  displayName: string;
}

const InviteModal = ({ users }: Props) => {
  const [checkedList, setCheckedList] = useState<UserInfo[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const checkedItemHandler = (isChecked: boolean, user: UserInfo): void => {
    if (isChecked) {
      setCheckedList(prev => [...prev, user]);
      return;
    }
    if (!isChecked && checkedList.includes(user)) {
      setCheckedList(checkedList.filter(el => el !== user));
      return;
    }
  };

  const checkHandler = (
    e: React.ChangeEvent<HTMLInputElement>,
    user: UserInfo
  ): void => {
    setIsChecked(!isChecked);
    checkedItemHandler(e.target.checked, user);
  };

  const cancellClickHandler = (): void => {
    dispatch(modalActions.inviteModalClose());
  };

  const inviteClickHandler = async () => {
    console.log(checkedList);
    // startGroupChat(checkedList);
    dispatch(modalActions.inviteModalClose());
  };

  if (users.length === 0) {
    return (
      <div className="bg-white absolute top-[50px] right-2 w-56 h-[50%] rounded-[9px] p-3">
        <div className="h-[90%] flex justify-center items-center">
          <span className="text-sm">등록된 유저가 없습니다.</span>
        </div>
        <div className="w-full flex justify-center">
          <button
            className="w-full bg-[#0940af] text-white rounded-[8px]"
            onClick={cancellClickHandler}
          >
            취소
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white absolute top-[50px] right-2 w-56 h-[50%] rounded-[9px] p-3 flex-col justify-between">
      <div className="h-[90%] overflow-y-auto p-2">
        {users.map((user: UserInfo, index: number) => (
          <div key={index} className="w-full flex mb-4 items-center">
            <div>
              <input type="checkbox" onChange={e => checkHandler(e, user)} />
            </div>
            <div className="pl-3">
              <span>{user.displayName}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-between">
        <button
          className="w-[40%] bg-[#9E9E9E] text-white rounded-[8px]"
          onClick={cancellClickHandler}
        >
          취소
        </button>
        <button
          className="w-[40%] bg-[#0940af] text-white rounded-[8px]"
          onClick={inviteClickHandler}
        >
          초대
        </button>
      </div>
    </div>
  );
};

export default InviteModal;
