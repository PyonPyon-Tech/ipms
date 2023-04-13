import { useAuth } from "@hooks/useAuth";
import { FC, ReactNode, useState } from "react";
import { Greetings } from "./greetings";
import { SideBar } from "./sidebar";
import { SideMenu } from "./sidemenu";
import Breadcrumbs  from "./breadcrumbs";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [openSideMenu, setOpenSideMenu] = useState<boolean>(false);
  return (
    <>
      <header>
        <div
          style={{ boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)" }}
          className="fixed left-0 top-0 z-10 flex w-full items-center justify-between bg-blue py-2 px-8 font-bold text-blue md:py-4 md:px-10"
        >
          <div>
            <h1 className="text-base text-white sm:text-xl">IPMS</h1>
            <h2 className="md:hidden text-xs text-white  sm:text-base sm:text-xl">
              Integrated Pest Management System
            </h2>
          </div>
          <div>
            <h2 className="max-md:hidden text-xs text-white  sm:text-base sm:text-xl">
              Integrated Pest Management System
            </h2>
            <img
              className="md:hidden cursor-pointer scale-125 sm:scale-150"
              onClick={() => setOpenSideMenu(true)}
              src="/icons/hamburger.svg"
            ></img>
          </div>
        </div>
      </header>
      <main className="mt-16 flex md:mt-0 min-h-screen">
        <SideBar role={user?.role ?? 4} />
        <div className="hidden md:flex w-1/3 min-w-[192px] max-w-[360px] " />
        <SideMenu
          role={user?.role ?? 4}
          openSideMenu={openSideMenu}
          setOpenSideMenu={setOpenSideMenu}
        />
        <div className="md:mt-24 grow overflow-x-hidden mt-8">
          <div className="pl-8  md:pl-12 md:pb-2">
            <Breadcrumbs />
          </div>
          {children}</div>
      </main>
      <footer></footer>
    </>
  );
};
