import { useRouter } from "next/router";
import { useRouteTo } from "../../hooks/useRouter";

export default function PersonalChatPage() {
  const { routeTo } = useRouteTo();

  return (
    <div>
      <button onClick={() => routeTo("/personal")}>뒤로가기</button>
    </div>
  );
}
