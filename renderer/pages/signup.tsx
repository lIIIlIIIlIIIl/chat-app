import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { signupFuc, userProfileFuc } from "../services/auth";
import { signupDB } from "../services/database";
import { auth } from "../services/firebase";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email !== "" && password !== "" && passwordConfirm !== "") {
      if (password !== passwordConfirm) {
        setErrorMsg("비밀번호를 확인해주세요.");
        console.log(errorMsg);
      }
      if (password === passwordConfirm) {
        try {
          await signupFuc(email, password);
          await userProfileFuc(nickname);
          await signupDB(email, nickname);
          router.push("/home");

          setEmail("");
          setPassword("");
          setNickname("");
          setPasswordConfirm("");
          setErrorMsg("");
        } catch (error) {
          switch (error.code) {
            case "auth/weak-password":
              setErrorMsg("비밀번호는 6자리 이상이어야 합니다");
              break;
            case "auth/invalid-email":
              setErrorMsg("잘못된 이메일 주소입니다");
              break;
            case "auth/email-already-in-use":
              setErrorMsg("이미 가입되어 있는 계정입니다");
              break;
          }
        }
      }
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
          <div className="w-full mt-5 flex justify-around">
            <button
              className="w-2/5 pt-1 pb-1 text-lg bg-[#fff700]"
              onClick={() => {
                router.back();
              }}
            >
              취소
            </button>
            <button className="w-2/5 pt-1 pb-1 text-lg bg-[#fff700]">
              Signup
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
