import { useEffect, useRef, useState } from "react";
import { getChats } from "../../services/database";
import { auth } from "../../services/firebase";
import { database } from "../../services/firebase";
import { ref } from "firebase/database";
import { getMyUID } from "../../services/auth";
import { sendChat, startChatRoom } from "../../services/chat";
import { useAppSelector } from "../../helper/reduxHooks";

const myChatCssProps: React.CSSProperties = {
  width: "100%",
  marginTop: "3px",
  marginBottom: "3px",
  textAlign: "right",
  wordBreak: "break-all",
};
const chatCssProps: React.CSSProperties = {
  width: "100%",
  marginTop: "3px",
  marginBottom: "3px",
  textAlign: "left",
  wordBreak: "break-all",
};

const ChatModal = props => {
  const myUID = getMyUID();
  const ref = useRef(window);
  const [chatInput, setChatInput] = useState("");
  const [isShiftUsed, setIsShiftUsed] = useState(false);
  const [chat, setChat] = useState([]);
  const messageEndRef = useRef(null);
  const { roomId, displayName } = useAppSelector(state => state.chat);

  useEffect(() => {
    const handledMessageEvent = (e: CustomEvent) => {
      setChat(e.detail);
    };
    ref.current.addEventListener(`message/${roomId}`, handledMessageEvent);
    startChatRoom(roomId);
    console.log("modal", roomId, displayName);

    return () => {
      ref.current.removeEventListener(`message/${roomId}`, handledMessageEvent);
    };
  }, []);

  const sendMessage = () => {
    if (chatInput === "") return;
    sendChat(roomId, chatInput);
    setChatInput("");
  };

  const keyUpHandler = e => {
    if (e.key === "Shift") setIsShiftUsed(false);
  };
  const keyDownHandler = e => {
    if (e.key === "Shift") setIsShiftUsed(true);
    if (e.key === "Enter") {
      if (e.nativeEvent.isComposing === false && isShiftUsed !== true) {
        e.preventDefault();
        sendMessage();
      }
    }
  };

  const scroolToBottom = () => {
    if (messageEndRef.current === null) return;
    messageEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scroolToBottom();
  }, [chat]);

  return (
    <div className="w-full h-full boder-2 bg-[#F0F2F5] left-0 top-0 flex items-center">
      <div className="w-[50%] h-[80%] m-auto bg-[#051525]">
        <div className="w-full h-[10%] border-b-2 flex justify-between pl-2 pr-2">
          <div className="">
            <div className="text-white">방 제목</div>
          </div>
          <div className="">
            <button
              className="text-white bg-[#0940af] w-[30px] h-[30px] rounded-[8px] cursor-pointer"
              onClick={props.exitChatRoom}
            >
              X
            </button>
          </div>
        </div>
        <div className="w-full h-[65%] ">
          {chat &&
            chat.map((chatting, index) => {
              if (index === 0) return;
              if (chatting.uid === myUID) {
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
        <div className="w-full h-[25%] ">
          <form className="h-full" onSubmit={sendMessage}>
            <div className="h-[70%]">
              <input
                className="w-full h-full border-none  focus:outline-none pl-3 pr-3"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => keyDownHandler(e)}
                onKeyUp={e => keyUpHandler(e)}
              />
            </div>
            <div className="h-[30%] w-full flex justify-end items-center p-1">
              <button className="h-full w-[60px] text-white bg-[#0940af] rounded-[8px]">
                전송
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatModal;
