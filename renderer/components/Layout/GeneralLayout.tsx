import Sidbar from "../Sidbar";

export default function GeneralLayout({ children }) {
  return (
    <div className="flex w-screen h-screen">
      <div className="w-[15%] h-full">
        <Sidbar />
      </div>
      <div className="w-[85%] h-full">
        <main className="w-full h-full">{children}</main>
      </div>
    </div>
  );
}
