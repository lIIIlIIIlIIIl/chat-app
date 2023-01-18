import { useRouter } from "next/router";
import { useState } from "react";

const user = [
  {
    email: "snsn@naver.com",
    password: "123123",
  },
];

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (user[0].email === email && user[0].password === password) {
      console.log("로그인 성공");
      router.push("/home");
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
        </form>
      </div>
    </div>
  );
};

export default Login;
