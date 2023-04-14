import { useAuth } from "@hooks/useAuth";
import { FC, ReactNode, useState } from "react";
import { Greetings } from "./greetings";
import { SideBar } from "./sidebar";
import { SideMenu } from "./sidemenu";
import Breadcrumbs from "./breadcrumbs";
import { Checkbox } from "@mui/material";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
    const { user } = useAuth();
    console.log(user?.name)
    const [openSideMenu, setOpenSideMenu] = useState<boolean>(false);
    return (
        <>
            <header>
                <div
                    style={{
                        boxShadow: " 0px 0px 5px 0px rgba(197, 197, 197, 1)",
                    }}
                    className="fixed left-0 top-0 z-10 flex w-full bg-blue py-2 px-8 font-bold text-blue md:py-4 md:px-10"
                >
                    <div className="flex justify-between w-full max-md:flex-col">
                      <div>
                        <h1 className="text-base text-white md:text-xl">
                            IPMS
                        </h1>
                      </div>
                      <div>
                        <h2 className="text-xs text-white md:text-xl">
                            Integrated Pest Management System
                        </h2>
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
                <div className="hidden w-1/3 min-w-[300px] max-w-[360px] md:flex " />
                <SideMenu
                    role={user?.role ?? 4}
                    openSideMenu={openSideMenu}
                    setOpenSideMenu={setOpenSideMenu}
                />
                <div className="grow overflow-x-hidden md:mt-28">
                  <div className="pl-12">
                    <Breadcrumbs/>
                  </div>
                    {children}
                </div>
            </main>
            <footer></footer>
        </>
    );
};
