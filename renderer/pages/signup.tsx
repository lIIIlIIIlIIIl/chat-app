import { useRouter } from "next/router";
import { useRef, useState } from "react";
import { validateEmail, validateNickname } from "../assets/InputCheck";
import CompoOfInput from "../components/Input/compoOfInput";
import { signupFuc, userProfileFuc } from "../services/auth";
import { searchData, usersInfoDB } from "../services/database";

const Signup = () => {
  const [email, setEmail] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string>("");

  const router = useRouter();

  const onSubmitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (email === "") return setErrorMsg("이메일을 입력해주세요.");
    if (!validateEmail(email))
      return setErrorMsg("이메일을 올바르게 입력해주세요.");

    if (nickname === "") return setErrorMsg("닉네임을 입력해주세요.");
    if (!validateNickname(nickname))
      return setErrorMsg(
        "닉네임은 한글, 영문, 숫자 포함 1~20자 이상 입력해야합니다."
      );

    if (password === "") return setErrorMsg("비밀번호를 입력해주세요");
    if (passwordConfirm === "")
      return setErrorMsg("비밀번호를 한번 더 입력해주세요");

    if (
      email !== "" &&
      nickname !== "" &&
      password !== "" &&
      passwordConfirm !== ""
    ) {
      if (password.length < 5 || password.length > 20)
        return setErrorMsg("비밀번호는 5~20자 입력해야합니다.");

      if (password !== passwordConfirm)
        return setErrorMsg("비밀번호를 다시 확인해주세요.");

      try {
        await signupFuc(email, password).then(() => {
          userProfileFuc(nickname);
          usersInfoDB(email, nickname);
          searchData(nickname);
          router.push("/home");
          setEmail("");
          setPassword("");
          setNickname("");
          setPasswordConfirm("");
          setErrorMsg("");
        });
      } catch (error) {
        switch (error.code) {
          case "auth/email-already-in-use":
            setErrorMsg("이미 사용 중인 이메일입니다");
            break;
        }
      }
    }
  };
  return (
    <div className="w-screen h-screen flex flex-col justify-center">
      <div className="w-96 h-72 m-auto flex flex-col justify-center ">
        <form className="pt-5 pb-5" onSubmit={onSubmitHandler}>
          <CompoOfInput
            placeholder="이메일을 입력해주세요."
            setChange={setEmail}
          />
          <CompoOfInput
            placeholder="닉네임을 입력해주세요."
            setChange={setNickname}
          />
          <CompoOfInput
            placeholder="비밀번호를 입력해주세요."
            type="password"
            setChange={setPassword}
          />
          <CompoOfInput
            placeholder="비밀번호를 한번 더 입력해주세요."
            type="password"
            setChange={setPasswordConfirm}
          />
          <div className="w-full mb-5">
            <span className="text-[red]">{errorMsg}</span>
          </div>
          <div className="w-full mt-5 flex justify-around">
            <button
              className="w-2/5 pt-1 pb-1 text-lg bg-[#fff700] rounded-[9px]"
              onClick={() => {
                router.back();
              }}
            >
              취소
            </button>
            <button className="w-2/5 pt-1 pb-1 text-lg bg-[#fff700] rounded-[9px]">
              회원가입
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
