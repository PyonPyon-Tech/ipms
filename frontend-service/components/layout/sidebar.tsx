import { NAVCARDS } from "@constants/roles";
import { NavigationCardProps } from "@type/navigationCardProps";
import { FC } from "react";
import { NavigationCard } from "./navcard";
import { useAuth } from "@hooks/useAuth";
import { Greetings } from "./greetings";


export const SideBar: FC<{ role: number }> = ({ role }) => {
  const {user, logout}=useAuth()
  return (
      <aside className="fixed left-0 top-0 hidden h-screen w-1/3 max-w-[300px] overflow-y-scroll items-start bg-white shadow-basic pt-20 md:flex scrollbar-hide">
        <div className="w-full flex flex-col pb-10">
          <div className="pl-8  md:pl-10">
            <Greetings />
          </div>
          {(NAVCARDS[role] as NavigationCardProps[]).map((detail) => (
            <NavigationCard key={"navcard" + detail.name} {...detail} />
          ))}
          <div className="pl-8 bg-blue md:pl-10">
            <div onClick={logout} className="cursor-pointer font-semibold text-xs text-white md:py-4 md:px-2 md:rounded-l-lg md:text-base flex justify-between">
              <h4>Keluar</h4>
              <img className="object-fill h-6 w-6" src="/icons/logout.svg" />
            </div>
          </div>
        </div>
      </aside>
  );
};
