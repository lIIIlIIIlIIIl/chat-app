import React, { useEffect, useState } from "react";
import {
  getSearchUserList,
  userAddToMyUserList,
} from "../../services/userStatus";

interface UserInfo {
  opponentUid: string;
  displayName: string;
  connected: boolean;
}

export default function SearchModal({
  searchModalOnClickHandler,
  isModalOpen,
}) {
  const [findUser, setFindUser] = useState<UserInfo | "no data">(null);
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    setFindUser(null);
    setIsClicked(false);
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

  const addButtonHandler = () => {
    if (!findUser) return;

    if (findUser === "no data") return;

    userAddToMyUserList(findUser);
    searchModalOnClickHandler();
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
          <div className="h-full w-[15%] bg-blue-400 flex justify-center rounded-xl text-white ">
            <input
              type="submit"
              value="검색"
              className="h-full w-full cursor-pointer"
            />
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
                    <div
                      className="w-[85%] h-full flex items-center pt-1 pb-1 cursor-pointer"
                      onClick={() => setIsClicked(prev => !prev)}
                    >
                      <div className="">
                        <div className="flex items-center justify-center w-12 h-12 p-2 border-2 border-[#facc15] rounded-full">
                          <span className="text-center text-xs">사진</span>
                        </div>
                      </div>
                      <div className="flex justify-start items-center h-full w-full pl-3">
                        <div>
                          <span>{findUser.displayName}</span>
                        </div>
                        <div>
                          <span className="text-[12px] pl-2">
                            {findUser.connected ? "(온라인)" : "(오프라인)"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="w-[15%] h-full flex justify-center items-center pt-2 pb-2 pl-1 pr-1">
                      {isClicked && (
                        <button
                          className="w-full h-[60%] bg-[#3b82f6] rounded-md text-white p-2 text-[12px]"
                          onClick={addButtonHandler}
                        >
                          추가
                        </button>
                      )}
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
