import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { useAppDispatch } from "../helper/reduxHooks";
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
  const router = useRouter();
  const dispatch = useAppDispatch();

  const startChatWith = useCallback(async () => {
    await startChat(audienceUid);
    setViewBtn(e => !e);
    dispatch(
      chatActions.chatOpen({
        roomId: audienceUid,
        displayName: nickname,
        roomUsers: roomUsers,
      })
    );

    dispatch(modalActions.openModal());

    if (router.pathname !== "/person") {
      router.push("/personal");
    }
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
        className="w-full h-full flex pt-1 pb-1 cursor-pointer"
        onClick={userClickHandler}
      >
        <div className="h-full flex items-center p-2">
          <div className="rounded-full w-12 h-12 text-center border-2 border-[#facc15]">
            U
          </div>
        </div>
        <div className="h-full w-full">
          <div className="pl-2 pt-3 pb-0.5 ">
            <span>{nickname}</span>
          </div>
          <div className="pl-2 pt-0.5 pb-3 text-[#a8a29e]">{message}</div>
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
