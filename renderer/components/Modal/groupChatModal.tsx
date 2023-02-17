import React, { useEffect, useRef, useState } from "react";

import { getMyUID } from "../../services/auth";
import { sendGroupChat, startGroupChatRoom } from "../../services/chat";
import { useAppSelector } from "../../helper/reduxHooks";

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

interface Props {
  exitChatRoom: () => void;
}

interface Chat {
  displayName: string;
  message: string;
  uid: string;
}

const GroupChatModal = ({ exitChatRoom }: Props) => {
  const [chatInput, setChatInput] = useState<string>("");
  const [isShiftUsed, setIsShiftUsed] = useState<boolean>(false);
  const [chat, setChat] = useState<Chat[]>([]);

  const myUID = getMyUID();
  const ref = useRef(window);
  const messageEndRef = useRef(null);
  const { roomId, displayName } = useAppSelector(state => state.group);

  useEffect(() => {
    const handledMessageEvent = (e: CustomEvent) => {
      setChat(e.detail);
    };
    ref.current.addEventListener(`message/${roomId}`, handledMessageEvent);
    startGroupChatRoom(roomId);

    return () => {
      ref.current.removeEventListener(`message/${roomId}`, handledMessageEvent);
    };
  }, []);

  const sendMessage = (e): void => {
    e.preventDefault();

    if (chatInput === "") return;
    sendGroupChat(roomId, chatInput);
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
    <div className="w-full h-full boder-2 bg-[#F0F2F5] left-0 top-0 flex items-center pt-3 pb-3 relative">
      <div className="w-[40%] h-full m-auto bg-[#5fadfb] rounded-[9px] pt-2 pb-2">
        <div className="w-full h-[10%] border-b-2 flex justify-between pl-2 pr-2">
          <div className="">
            <div className="text-white">{displayName}</div>
          </div>
          <div className="">
            <button
              className="text-white bg-[#0940af] w-[30px] h-[30px] rounded-[8px] cursor-pointer"
              onClick={exitChatRoom}
            >
              X
            </button>
          </div>
        </div>
        <div className="w-full h-[65%] overflow-y-auto">
          {chat &&
            chat.map((chatting: Chat, index: number) => {
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
                        paddingLeft: "10px",
                        paddingRight: "10px",
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
                        paddingLeft: "10px",
                        paddingRight: "10px",
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
              <textarea
                cols={10}
                rows={5}
                className="w-full h-full border-none  focus:outline-none pl-3 p-3 resize-none"
                value={chatInput}
                onChange={e => setChatInput(e.target.value)}
                onKeyDown={e => keyDownHandler(e)}
                onKeyUp={e => keyUpHandler(e)}
              />
            </div>
            <div className="h-[30%] w-full flex justify-end items-center pt-1">
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

export default GroupChatModal;
