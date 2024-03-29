import { useAppDispatch } from "../helper/reduxHooks";
import { useRouteTo } from "../hooks/useRouter";
import { chatActions } from "../store/reducer/chatSlice";
import { modalActions } from "../store/reducer/modalSlice";

interface Porps {
  nickname: any;
  audienceUid: string;
  message: string;
  roomUsers: [];
}

const PersonalItem = ({ nickname, message, audienceUid, roomUsers }: Porps) => {
  const dispatch = useAppDispatch();
  const { routeTo } = useRouteTo();

  const startGroupChatWith = (): void => {
    dispatch(
      chatActions.chatOpen({
        roomId: audienceUid,
        displayName: nickname,
        roomUsers: roomUsers,
      })
    );
    routeTo(`/personal/${audienceUid}`);

    // dispatch(modalActions.openModal());
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
          <div className="pl-2 pt-3 pb-0.5 ">
            <span>{nickname}</span>
          </div>
          <div className="pl-2 pt-0.5 pb-3 text-[#a8a29e]">{message}</div>
        </div>
      </div>
      <div className="w-[12%] h-full flex justify-center items-center pt-2 pb-2 pl-1 pr-1 "></div>
    </div>
  );
};

export default PersonalItem;
