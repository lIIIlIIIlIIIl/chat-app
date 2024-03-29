import Link from "next/link";
import { useState } from "react";
import { validateEmail } from "../assets/InputCheck";
import CompoOfInput from "../components/Input/compoOfInput";
import { useRouteTo } from "../hooks/useRouter";
import { signInWithEmail } from "../services/auth";
import { onUserConnect } from "../services/userStatus";

const Home = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [erroMes, setErroMsg] = useState<string>("");

  const { routeTo } = useRouteTo();

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "") return setErroMsg("이메일을 입력해주세요.");
    if (password === "") return setErroMsg("비밀번호를 입력해주세요.");

    if (email !== "" && password !== "") {
      if (!validateEmail(email))
        return setErroMsg("이메일 주소가 올바르지 않습니다.");

      if (password.length < 5 || password.length > 20)
        return setErroMsg("비밀번호는 5~20자 입력해야합니다.");

      const result = await signInWithEmail(email, password);
      switch (result) {
        case "auth/user-not-found":
          setErroMsg("이메일을 확인해주세요.");
          break;
        case "auth/wrong-password":
          setErroMsg("비밀번호를 확인해주세요.");
          break;
        case "auth/too-many-requests":
          setErroMsg("잠시 후 다시 로그인해주세요.");
          break;
      }

      if (
        result._tokenResponse !== undefined &&
        result._tokenResponse.registered === true
      ) {
        document.cookie = `member = ${result.user.accessToken}; path=/`;
        onUserConnect();
        routeTo("/userlist");
      }
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col justify-center">
      <div className="w-96 h-72 m-auto flex flex-col justify-center ">
        <form
          className="flex flex-col justify-between"
          onSubmit={onSubmitHandler}
        >
          <CompoOfInput
            placeholder="이메일을 입력해주세요."
            setChange={setEmail}
          />
          <CompoOfInput
            placeholder="비밀번호를 입력해주세요."
            type="password"
            setChange={setPassword}
          />

          <div className="w-full mb-5">
            <span className="text-[red]">{erroMes}</span>
          </div>
          <div className="w-full mb-5">
            <button className="w-full pt-1 pb-1 text-lg bg-[#fff700]">
              Login
            </button>
          </div>
          <div className="w-full flex justify-end">
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
