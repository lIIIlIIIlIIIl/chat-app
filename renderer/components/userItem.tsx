interface Porps {
  nickname: string;
  message?: string;
}

const UserItem = (props: Porps) => {
  return (
    <div className="w-full h-20 ">
      <div className="w-full h-full flex pt-1 pb-1">
        <div className="h-full flex items-center p-2">
          <div className="rounded-full w-12 h-12 text-center border-2 border-[#facc15]">
            U
          </div>
        </div>
        <div className="h-full w-full">
          <div className="pl-2 pt-3 pb-0.5">{props.nickname}</div>
          <div className="pl-2 pt-0.5 pb-3 text-[#a8a29e]">{props.message}</div>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
