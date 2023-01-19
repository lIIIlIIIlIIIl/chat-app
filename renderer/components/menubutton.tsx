import Link from "next/link";

interface Props {
  text: string;
  href: string;
}

const MenuButton = (props: Props) => {
  return (
    <div className="w-full text-center p-3 hover:bg-[#8b5cf6] cursor-pointer">
      <Link href={props.href}>
        <a className="text-white font-sans">{props.text}</a>
      </Link>
    </div>
  );
};

export default MenuButton;
