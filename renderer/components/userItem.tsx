import { useCallback, useState } from "react";
import { useAppDispatch } from "../helper/reduxHooks";
import { useRouteTo } from "../hooks/useRouter";
import { startChat } from "../services/chat";
import { deleteMyUserList } from "../services/userStatus";
import { chatActions } from "../store/reducer/chatSlice";
import { modalActions } from "../store/reducer/modalSlice";

interface Porps {
  nickname: any;
  audienceUid: string;
  message?: string;
  roomUsers?: [];
  deleteUserFormUserList: (opponentUid: string) => void;
}

const UserItem = ({
  nickname,
  audienceUid,
  message,
  roomUsers,
  deleteUserFormUserList,
}: Porps) => {
  const [viewBtn, setViewBtn] = useState<boolean>(false);
  const { routeTo } = useRouteTo();
  const dispatch = useAppDispatch();

  const startChatWith = useCallback(async () => {
    const roomId = await startChat(audienceUid);
    setViewBtn(e => !e);

    dispatch(
      chatActions.chatOpen({
        roomId: audienceUid,
        displayName: nickname,
        roomUsers: roomUsers,
      })
    );

    routeTo(`/personal/${roomId}`);
  }, []);

  const userClickHandler = () => {
    setViewBtn(e => !e);
  };

  const deleteUser = () => {
    deleteUserFormUserList(audienceUid);
    deleteMyUserList(audienceUid);
  };

  return (
    <li className="w-full h-20 flex">
      <div
        className="w-full h-full flex items-center  pt-1 pb-1 cursor-pointer"
        onClick={userClickHandler}
      >
        <div>
          <div className="flex items-center justify-center w-12 h-12 p-2 border-2 border-[#facc15] rounded-full">
            <span className="text-center text-xs">사진</span>
          </div>
        </div>
        <div className="flex justify-start items-center h-full w-full pl-3">
          <div>
            <span>{nickname}</span>
          </div>
          {message ? (
            <div className="pl-2 pt-1 pb-3 text-[#a8a29e]">{message}</div>
          ) : null}
        </div>
        <div className="w-[30%] h-full flex justify-between items-center">
          {viewBtn && (
            <>
              <div className="h-[60%] w-[40%]">
                <button
                  className="h-full w-full bg-[#3b82f6] rounded-md text-white p-2 text-[12px]"
                  onClick={startChatWith}
                >
                  채팅
                </button>
              </div>

              <div className="h-[60%] w-[40%]">
                <button
                  className="h-full w-full bg-[#FF1744] rounded-md text-white p-2 text-[12px]"
                  onClick={deleteUser}
                >
                  삭제
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </li>
  );
};

export default UserItem;
