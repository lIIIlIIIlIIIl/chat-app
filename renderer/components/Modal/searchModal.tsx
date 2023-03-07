import React, { useEffect, useState } from "react";
import { getSearchUserList } from "../../services/userStatus";

interface Props {
  searchModalOnClickHandler: () => void;
  isModalOpen: boolean;
}

interface UserInfo {
  uid: string;
  displayName: string;
  connected: boolean;
}

export default function SearchModal({
  searchModalOnClickHandler,
  isModalOpen,
}) {
  const [findUser, setFindUser] = useState<UserInfo | "no data">(null);
  const [isFind, setIsFind] = useState<boolean>(false);

  useEffect(() => {
    setFindUser(null);
  }, [isModalOpen]);

  const searchButtonClickHandler = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const searchRes: string = formData.get("displayName") as string;

    const userInfo: UserInfo | "no data" = await getSearchUserList(searchRes);

    setFindUser(userInfo);
  };

  console.log(findUser);

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
        <form
          className="w-full h-[15%] flex justify-between pl-5 pr-5 pt-3 pb-3"
          onSubmit={searchButtonClickHandler}
        >
          <div className="h-full w-[80%]">
            <input
              type="text"
              className="w-full h-full pl-5 pr-5 py-2 px-2 text-grey-darkest border-b-2 focus:outline-none focus:border-blue-400"
              placeholder="닉네임을 입력해주세요."
              name="displayName"
            />
          </div>
          <div className="h-full w-[15%] bg-blue-400 flex justify-center rounded-xl text-white">
            <input type="submit" value="검색" className="h-full w-full " />
          </div>
        </form>
        <div className="w-full h-[70%] flex item-center">
          <div className="w-[80%] mr-auto ml-auto pt-3 pb-3">
            {!findUser ? null : (
              <ul>
                {findUser === "no data" ? (
                  <li>
                    <div>검색 결과가 없습니다.</div>
                  </li>
                ) : (
                  <li className="w-full h-20 flex">
                    <div className="w-[85%] h-full flex pt-1 pb-1 cursor-pointer">
                      <div className="w-12 h-12 flex items-center justify-center p-2 border-2 border-[#facc15] rounded-full">
                        <span className="text-center text-xs">사진</span>
                      </div>
                      <div className="h-full w-full">
                        <div className="pl-2 pt-3 pb-0.5 ">
                          <span>{findUser.displayName}</span>
                          <span className="text-[12px] pl-2">
                            {findUser.connected ? "(온라인)" : "(오프라인)"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-[12%] h-full flex justify-center items-center pt-2 pb-2 pl-1 pr-1 ">
                      {/* {viewBtn && (
                      <button
                        className="h-full w-full bg-[#3b82f6] rounded-md text-white p-2 text-[12px]"
                        onClick={startChatWith}
                      >
                        채팅하기
                      </button>
                    )} */}
                    </div>
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
