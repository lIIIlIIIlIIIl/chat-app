import { useRef, useState } from "react";
import { sendChat } from "../../services/database";
import { auth } from "../../services/firebase";

const ChatForm = () => {
  const teatareaRef = useRef(null);
  let uid = auth.currentUser.uid;

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await sendChat({
        message: teatareaRef.current.value,
        timestamp: Date.now(),
        userId: uid,
      });
    } catch (error) {
      console.log(error);
    }
    teatareaRef.current.value = "";
  };

  return (
    <form className="h-full" onSubmit={onSubmitHandler}>
      <div className="h-[80%]">
        <textarea
          name="chatArea"
          cols={30}
          rows={5}
          className="w-full h-full resize-none border-none p-2 focus:outline-none"
          ref={teatareaRef}
        />
      </div>
      <div className="h-[20%] w-full flex justify-end items-center">
        <button className="h-full w-[60px] bg-[#eab308]">전송</button>
      </div>
    </form>
  );
};

export default ChatForm;
