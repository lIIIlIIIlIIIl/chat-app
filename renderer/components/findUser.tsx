const FindUser = () => {
  return (
    <div className="w-full h-[10%] bg-[#F0F2F5] flex p-3">
      <div className="w-[90%] h-full flex justify-center items-center">
        <input type="text" className="p-3 w-full h-[45px]" />
      </div>
      <div className="w-[10%] h-full flex justify-center items-center">
        <button className="bg-white w-[45px] h-[45px]">검색</button>
      </div>
    </div>
  );
};

export default FindUser;
