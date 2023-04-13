import { NAVCARDS } from "@constants/roles";
import { NavigationCardProps } from "@type/navigationCardProps";
import { FC } from "react";
import { NavigationCard } from "./navcard";
import { useAuth } from "@hooks/useAuth";
import { Greetings } from "./greetings";

export const SideMenu: FC<{
  role: number;
  openSideMenu: boolean;
  setOpenSideMenu: React.Dispatch<boolean>;
}> = ({ role, openSideMenu, setOpenSideMenu }) => {
  const {user, logout}=useAuth()
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`fixed right-0 top-0 z-50 h-screen w-3/5 sm:w-1/2 md:hidden transform bg-white pt-20 transition-all ${
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
      <div className="pl-8 w-full">
        <div onClick={logout} className="pl-8 py-4 cursor-pointer bg-red-800 font-semibold text-xs text-white rounded-l-lg text-base flex justify-between">
          <h4>Keluar</h4>
          <img className="object-fill h-6 w-6" src="/icons/logout.svg" />
        </div>
      </div>
      <div className="pl-8 flex w-full flex-col">
        {(NAVCARDS[role] as NavigationCardProps[]).map((detail) => (
          <NavigationCard key={"navcard" + detail.name} {...detail} />
        ))}
      </div>
    </div>
  );
};
