import React from "react";
import Link from "next/link";

function Home() {
  return (
    <React.Fragment>
      <div className="flex w-screen h-screen">
        <aside className="bg-gray-900 w-1/6 "></aside>
        <div className="bg-white w-5/6">
          <Link href="/login" className="bg-gray-900 text-white">
            loginPage
          </Link>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Home;
