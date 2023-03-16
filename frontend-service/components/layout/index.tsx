import { FC, ReactNode } from "react";
import { Greetings } from "./greetings";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const isLoggedIn = true;
  return (
    <>
      <header>
        <div
          style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
          className="fixed left-0 top-0 z-10 flex w-full items-center justify-between bg-white p-8 font-bold text-blue md:py-4 md:px-10"
        >
          <div>
            <h1 className="text-base text-blue sm:text-xl md:text-4xl">IPMS</h1>
            <h2 className="text-xs sm:text-base md:text-2xl">
              Integrated Pest Management System
            </h2>
          </div>
          <div>
            <Greetings/>
            <img className="md:hidden" src="/icons/hamburger.svg"></img>
          </div>
        </div>
      </header>
      <main className="mt-28 md:mt-0 flex">
        <aside className="relative left-0 top-0 hidden h-screen w-1/3 max-w-[360px] bg-blue-dark md:flex"></aside>
        <div className="mt-28">{children}</div>
      </main>
      <footer></footer>
    </>
  );
};
