import { auth } from "../../services/firebase";
import Nav from "../Nav";

export default function GeneralLayout({ children }) {
  return (
    <div className="flex w-screen h-screen">
      {auth.currentUser ? (
        <div className="w-[15%] h-full">
          <Nav />
        </div>
      ) : null}

      <div className="w-[85%] h-full">
        <main className="w-full h-full">{children}</main>
      </div>
    </div>
  );
}
