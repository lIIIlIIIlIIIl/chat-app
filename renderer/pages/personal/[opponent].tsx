import { useEffect, useState } from "react";
import { useRouteTo } from "../../hooks/useRouter";
import { getChatInfos } from "../../services/chat";
import { auth } from "../../services/firebase";

const myChatCssProps: React.CSSProperties = {
  width: "100%",
  marginTop: "3px",
  marginBottom: "3px",
  textAlign: "right",
  wordBreak: "break-all",
  paddingRight: "5px",
};
const chatCssProps: React.CSSProperties = {
  width: "100%",
  marginTop: "3px",
  marginBottom: "3px",
  textAlign: "left",
  wordBreak: "break-all",
  paddingLeft: "5px",
};

interface Chat {
  displayName: string;
  message: string;
  uid: string;
}

interface ChatInfo {
  opponent: string;
  chatList: Chat[];
}

export default function PersonalChatPage() {
  const [chat, setChat] = useState<ChatInfo>(null);
  const [chatInput, setChatInput] = useState<string>("");
  const { routeTo, routeQuery } = useRouteTo();

  const roomId = routeQuery.opponent as string;
  const myName = auth.currentUser.displayName;

  useEffect(() => {
    const getChat = async () => {
      const roomInfo = await getChatInfos(roomId);

      const opponent = Object.values(roomInfo.user)[0] as string;
      const chatList = roomInfo.chat;

      setChat({ opponent, chatList });
    };

    getChat();
  }, []);

  return (
    <>
      <div className="w-[60%] h-full m-auto border-2 border-[#00B0FF]">
        <div className="w-full h-[10%] border-b-2 flex justify-between items-center pl-2 pr-2 border-[#00B0FF]">
          <div className="w-[5%]">
            <button onClick={() => routeTo("/personal")}>⬅️</button>
          </div>
          <div className="w-[95%] pl-3">
            <div className="">{chat ? chat.opponent : "알수없음"}</div>
          </div>
        </div>
        <div className="w-full h-[65%] overflow-y-auto">
          {chat &&
            chat.chatList.map((chatting, index: number) => {
              if (index === 0) return;
              if (chatting.displayName === myName) {
                return (
                  <div style={myChatCssProps} key={index}>
                    <div
                      style={{
                        width: "fit-content",
                        backgroundColor: "rgb(248,227,76)",
                        borderRadius: "5px",
                        marginLeft: "auto",
                        padding: "2px",
                        paddingLeft: "5px",
                        paddingRight: "5px",
                      }}
                    >
                      {chatting.message}
                    </div>
                  </div>
                );
              } else {
                return (
                  <div style={chatCssProps} key={index}>
                    {chatting.displayName}
                    <br />
                    <div
                      style={{
                        width: "fit-content",
                        backgroundColor: "white",
                        borderRadius: "5px",
                        marginRight: "auto",
                        padding: "2px",
                        paddingLeft: "5px",
                        paddingRight: "5px",
                      }}
                    >
                      {chatting.message}
                    </div>
                  </div>
                );
              }
            })}
        </div>
        <div className="w-full h-[25%] bg-[#B3E5FC] border-t-2 border-[#00B0FF]">
          <form className="h-full ">
            <div className="h-[70%]">
              <textarea
                cols={10}
                rows={5}
                className="w-full h-full border-none  focus:outline-none p-3 pr-3 resize-none bg-[#B3E5FC]"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                // onKeyDown={e => keyDownHandler(e)}
                // onKeyUp={e => keyUpHandler(e)}
              />
            </div>
            <div className="h-[25%] w-full flex justify-end items-center pr-2">
              <button className="h-full w-[60px] text-white bg-[#0940af] rounded-[8px]">
                전송
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
