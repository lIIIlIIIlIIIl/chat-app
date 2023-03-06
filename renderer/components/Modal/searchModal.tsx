import { useState } from "react";

interface Props {
  searchModalOnClickHandler: () => void;
}

export default function SearchModal({ searchModalOnClickHandler }) {
  const [searchEmail, setSearchEmail] = useState<string>("");

  const searchClickHandler = () => {
    console.log(searchEmail);
  };

  return (
    <div className="w-full h-full bg-gray-900 bg-opacity-70 flex justify-center items-center absolute z-20 ">
      <div className="w-[60%] h-[80%] bg-white rounded-xl">
        <div className="w-full h-[10%] flex justify-end items-center pr-1">
          <button
            className="w-[30px] h-[30px]"
            onClick={searchModalOnClickHandler}
          >
            x
          </button>
        </div>
        <div className="w-full h-[15%] flex justify-between pl-5 pr-5 pt-3 pb-3">
          <div className="h-full w-[80%]">
            <input
              className="w-full h-full pl-5 pr-5 py-2 px-2 text-grey-darkest border-b-2 focus:outline-none focus:border-blue-400"
              placeholder="닉네임을 입력해주세요."
              onChange={e => setSearchEmail(e.target.value)}
            />
          </div>
          <div className="h-full w-[15%] bg-blue-400 flex justify-center rounded-xl text-white">
            <button className="h-full w-full " onClick={searchClickHandler}>
              찾기
            </button>
          </div>
        </div>
        <div className="w-full h-[70%]  bg-gray-600 flex item-center">
          <div className="w-[80%] bg-gray-200 mr-auto ml-auto pt-3 pb-3"></div>
        </div>
      </div>
    </div>
  );
}
