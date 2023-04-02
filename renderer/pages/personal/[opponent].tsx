import { useEffect, useRef, useState } from "react";
import { useRouteTo } from "../../hooks/useRouter";
import { getChatInfos, sendChat, startChatRoom } from "../../services/chat";
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
  const [chat, setChat] = useState<ChatInfo>({ opponent: "", chatList: [] });
  const [chatInput, setChatInput] = useState<string>("");
  const [isShiftUsed, setIsShiftUsed] = useState<boolean>(false);

  const { routeTo, routeQuery } = useRouteTo();
  const ref = useRef(window);
  const messageEndRef = useRef(null);
  const roomId = routeQuery.opponent as string;
  const myName = auth.currentUser.displayName;

  useEffect(() => {
    const handledMessageEvent = (e: CustomEvent) => {
      if (!e.detail.users) return;

      const opponent = Object.values(e.detail.users[0])[0] as string;
      const chatList = e.detail.chat.filter((chat, index) => index !== 0);
      setChat({
        chatList,
        opponent,
      });
    };

    ref.current.addEventListener(`message/${roomId}`, handledMessageEvent);
    startChatRoom(roomId);

    return () => {
      ref.current.removeEventListener(`message/${roomId}`, handledMessageEvent);
    };
  }, []);

  const sendMessage = (e): void => {
    e.preventDefault();

    if (chatInput === "") return;
    sendChat(roomId, chatInput);
    setChatInput("");
  };

  const keyUpHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>): void => {
    if (e.key === "Shift") setIsShiftUsed(false);
  };

  const keyDownHandler = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ): void => {
    if (e.key === "Shift") setIsShiftUsed(true);
    if (e.key === "Enter") {
      if (e.nativeEvent.isComposing === false && isShiftUsed !== true) {
        e.preventDefault();
        sendMessage(e);
      }
    }
  };

  const scroolToBottom = (): void => {
    if (messageEndRef.current === null) return;
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scroolToBottom();
  }, [chat]);

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
          {chat.chatList &&
            chat.chatList.map((chatting, index: number) => {
              if (index === 0) return;
              if (chatting.displayName === myName) {
                return (
                  <div ref={messageEndRef} style={myChatCssProps} key={index}>
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
                  <div ref={messageEndRef} style={chatCssProps} key={index}>
                    {chatting.displayName}
                    <br />
                    <div
                      style={{
                        width: "fit-content",
                        backgroundColor: "#EEEEEE",
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
          <form className="h-full" onSubmit={sendMessage}>
            <div className="h-[70%]">
              <textarea
                cols={10}
                rows={5}
                className="w-full h-full border-none  focus:outline-none p-3 pr-3 resize-none bg-[#B3E5FC]"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => keyDownHandler(e)}
                onKeyUp={e => keyUpHandler(e)}
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
