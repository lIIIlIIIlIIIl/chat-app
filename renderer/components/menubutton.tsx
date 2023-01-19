import Link from "next/link";
import { useRouter } from "next/router";

interface Props {
  text: string;
  path: string;
}

const MenuButton = (props: Props) => {
  const router = useRouter();
  const onClickHandler = () => {
    router.push(`${props.path}`);
  };
  return (
    <li
      className="w-full text-center p-3 hover:bg-[#1e3a8a] cursor-pointer"
      onClick={onClickHandler}
    >
      <Link href={props.path}>
        <a
          className={
            props.path === router.pathname ? "text-[#93c5fd]" : "text-white"
          }
        >
          {props.text}
        </a>
      </Link>
    </li>
  );
};

export default MenuButton;
