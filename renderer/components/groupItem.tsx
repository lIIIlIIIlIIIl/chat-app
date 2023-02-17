import { useEffect, useState } from "react";
import { useAppDispatch } from "../helper/reduxHooks";
import { groupActions } from "../store/reducer/groupSlice";
import { modalActions } from "../store/reducer/modalSlice";

interface Porps {
  roomName: any;
  roomUid: string;
  message?: string;
  connected?: boolean;
  roomUsers?: [];
}

const GroupItem = ({ roomName, roomUid, message, roomUsers }: Porps) => {
  const dispatch = useAppDispatch();
  const [roomMembers, setRoomMembers] = useState<string[]>([]);

  useEffect(() => {
    const roomMember = [];

    roomUsers.map(el => {
      roomMember.push(Object.values(el)[0]);
    });
    setRoomMembers(roomMember);
  }, []);

  const startGroupChatWith = (): void => {
    dispatch(
      groupActions.startGroupInfo({
        roomId: roomUid,
        displayName: roomName,
        members: roomUsers,
      })
    );
    dispatch(modalActions.openModal());
  };

  return (
    <div className="w-full h-20 flex">
      <div className="w-[85%] h-full flex pt-1 pb-1 cursor-pointer">
        <div className="h-full flex items-center p-2">
          <div className="rounded-full w-12 h-12 text-center border-2 border-[#facc15]">
            U
          </div>
        </div>
        <div className="h-full w-full" onClick={startGroupChatWith}>
          <div className="pl-2 pt-3 pb-0.5 flex">
            <div className="mr-5">
              <span>{roomName}</span>
            </div>
            <div>
              <span className="text-[] text-[12px] mr-2">맴버 :</span>
              {roomMembers.map((el: string, index: number) => (
                <span key={index} className="text-[] text-[12px] mr-2">
                  {el}
                </span>
              ))}
            </div>
          </div>
          <div className="pl-2 pt-0.5 pb-3 text-[#a8a29e]">{message}</div>
        </div>
      </div>
      <div className="w-[12%] h-full flex justify-center items-center pt-2 pb-2 pl-1 pr-1 "></div>
    </div>
  );
};

export default GroupItem;
