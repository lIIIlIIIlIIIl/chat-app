import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { signInWithEmail } from "../services/auth";
import { onUserConnect } from "../services/userStatus";

const Home = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email !== "" && password !== "") {
      const result = await signInWithEmail(email, password);
      if (
        result._tokenResponse !== undefined &&
        result._tokenResponse.registered === true
      ) {
        document.cookie = `member = ${result.user.accessToken}; path=/`;
        onUserConnect();
        router.push("/userlist");
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
              placeholder="비밀번호를 입력해주세요."
              className="border py-2 px-2 text-grey-darkest w-full"
              type="password"
              onChange={e => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="w-full mt-5">
            <button className="w-full pt-1 pb-1 text-lg bg-[#fff700]">
              Login
            </button>
          </div>
          <div className="w-full mt-5 flex justify-end">
            <Link href="/signup">
              <a className="text-[#3b82f6] text-xs pr-3">회원가입</a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
