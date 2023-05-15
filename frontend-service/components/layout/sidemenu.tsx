import { NAVCARDS } from "@constants/roles";
import { NavigationCardProps } from "@type/navigationCardProps";
import { FC } from "react";
import { NavigationCard } from "./navcard";
import { useAuth } from "@hooks/useAuth";
import { Greetings } from "./greetings";
import { useRouter } from "next/router";

export const SideMenu: FC<{
  role: number;
  openSideMenu: boolean;
  setOpenSideMenu: React.Dispatch<boolean>;
}> = ({ role, openSideMenu, setOpenSideMenu }) => {
  const { user, logout } = useAuth();
  const router = useRouter();

  function userLogout() {
    logout;
    router.push("/signin");
  }

  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`overflow-y-scroll scrollbar-hide fixed right-0 top-0 z-50 h-screen min-w-[300px] w-3/5 transform bg-white pt-20 transition-all sm:w-1/2 md:hidden ${
        openSideMenu ? "" : "translate-x-full"
      }`}
    >
      <img
        onClick={() => setOpenSideMenu(false)}
        src="/icons/close.svg"
        alt=""
        className="absolute top-8 right-8 cursor-pointer fill-blue-dark stroke-blue"
      />
      <div className="pl-8">
        <Greetings />
      </div>
      <div className="flex w-full flex-col">
        {(NAVCARDS[role] as NavigationCardProps[]).map((detail) => (
          <NavigationCard key={"navcard" + detail.name} {...detail} />
        ))}
      </div>
      <div className="bg-blue pl-8 h-auto">
        <div
          onClick={userLogout}
          className="flex cursor-pointer items-center py-2 justify-between text-xs font-semibold text-white md:rounded-l-lg md:text-base"
        >
          <h4>Keluar</h4>
          <img className="h-6 w-6 object-fill" src="/icons/logout.svg" />
        </div>
      </div>
    </div>
  );
};
