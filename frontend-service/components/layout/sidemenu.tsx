import { NAVCARDS } from "@constants/roles";
import { NavigationCardProps } from "@type/navigationCardProps";
import { FC } from "react";
import { NavigationCard } from "./navcard";

export const SideMenu: FC<{
  role: number;
  openSideMenu: boolean;
  setOpenSideMenu: React.Dispatch<boolean>;
}> = ({ role, openSideMenu, setOpenSideMenu }) => {
  return (
    <div
      onClick={(e) => e.stopPropagation()}
      className={`fixed right-0 top-0 z-50 h-screen w-3/5 sm:w-1/2 md:hidden transform bg-blue-dark pt-20 transition-all ${
        openSideMenu ? "" : "translate-x-full"
      }`}
    >
      <img
        onClick={() => setOpenSideMenu(false)}
        src="/icons/close.svg"
        alt=""
        className="absolute top-8 right-8 cursor-pointer fill-white stroke-white"
      />
      <div className="px-8 flex w-full flex-col gap-4">
        {(NAVCARDS[role] as NavigationCardProps[]).map((detail) => (
          <NavigationCard key={"navcard" + detail.name} {...detail} />
        ))}
      </div>
    </div>
  );
};
