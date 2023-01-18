import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const router = useRouter();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password === passwordConfirm) {
      const user = {
        email,
        nickname,
        password,
      };
      console.log(user);
      router.push("/login");
    }
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-center">
      <div className="w-96 h-72 m-auto flex flex-col justify-center ">
        <form className="pt-5 pb-5" onSubmit={onSubmitHandler}>
          <div className="w-full flex">
            <input
              placeholder="이메일을 입력해주세요."
              className="border py-2 px-2 text-grey-darkest w-full"
              type="email"
              onChange={e => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="w-full mt-5">
            <input
              placeholder="닉네임을 입력해주세요."
              className="border py-2 px-2 text-grey-darkest w-full"
              type="text"
              onChange={e => {
                setNickname(e.target.value);
              }}
            />
          </div>
          <div className="w-full mt-5">
            <input
              placeholder="비밀번호를 입력해주세요."
              className="border py-2 px-2 text-grey-darkest w-full"
              type="password"
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="w-full mt-5">
            <input
              placeholder="비밀번호를 한번 더 입력해주세요."
              className="border py-2 px-2 text-grey-darkest w-full"
              type="password"
              onChange={e => {
                setPasswordConfirm(e.target.value);
              }}
            />
          </div>
          <div className="w-full mt-5">
            <button className="w-full pt-1 pb-1 text-lg bg-[#fff700]">
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
