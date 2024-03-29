import { useAuth } from "@hooks/useAuth";
import { FC, ReactNode, useState } from "react";
import { Greetings } from "./greetings";
import { SideBar } from "./sidebar";
import { SideMenu } from "./sidemenu";
import Breadcrumbs from "./breadcrumbs";
import { Checkbox } from "@mui/material";
import { NotificationBellBadge } from "@components/notifications/badge";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [openSideMenu, setOpenSideMenu] = useState<boolean>(false);
  return (
    <>
      <header>
        <div className="fixed left-0 top-0 z-10 flex w-full bg-blue py-2 px-8 font-bold text-blue shadow-basic md:py-2 md:px-10">
          <div className="flex w-full items-center justify-between max-md:flex-col">
            <div>
              <h1 className="text-base text-white md:text-xl">IPMS</h1>
            </div>
            <div className="hidden items-center gap-x-4 sm:flex">
              <h2 className="text-xs text-white md:text-xl">Integrated Pest Management System</h2>
              <NotificationBellBadge />
            </div>
          </div>
          <div className="flex items-center">
            <img
              className="scale-125 cursor-pointer fill-white stroke-white sm:scale-150 md:hidden"
              onClick={() => setOpenSideMenu(true)}
              src="/icons/hamburger.svg"
            ></img>
          </div>
        </div>
      </header>
      <main className="mt-16 flex min-h-screen md:mt-0">
        <SideBar role={user?.role ?? 4} />
        <SideMenu role={user?.role ?? 4} openSideMenu={openSideMenu} setOpenSideMenu={setOpenSideMenu} />
        <div className="grow overflow-x-hidden md:mt-20 md:pl-[300px]">
          <div className="px-8 md:px-12 ">
            <div>
              <Breadcrumbs />
            </div>
            <div>{children}</div>
          </div>
        </div>
      </main>
      <footer className="h-28 md:h-10"></footer>
    </>
  );
};
