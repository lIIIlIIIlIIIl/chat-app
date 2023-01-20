interface Props {
  title: string;
  member: number;
}

const ChatModal = (props: Props) => {
  return (
    <div className="w-full h-full boder-2 bg-[#F0F2F5] absolute left-0 top-0">
      <div className="w-[60%] h-full m-auto bg-[#051525]">
        <div className="w-full h-[10%] border-2">
          <div></div>
          <div></div>
        </div>
        <div className="w-full h-[70%] border-2"></div>
        <div className="w-full h-[20%] border-2"></div>
      </div>
    </div>
  );
};

export default ChatModal;
