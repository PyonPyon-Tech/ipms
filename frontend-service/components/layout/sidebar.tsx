import { NAVCARDS } from "@constants/roles";
import { NavigationCardProps } from "@type/navigationCardProps";
import { FC } from "react";
import { NavigationCard } from "./navcard";

export const SideBar: FC<{ role: number }> = ({ role }) => {
  return (
      <aside className="fixed left-0 top-0 hidden h-screen w-1/3 max-w-[360px] items-start bg-blue-dark pt-36 md:flex">
        <div className="mx-5 w-full sm:mx-9 md:mx-10 flex flex-col gap-4">
          {(NAVCARDS[role] as NavigationCardProps[]).map((detail) => (
            <NavigationCard key={"navcard" + detail.name} {...detail} />
          ))}
        </div>
      </aside>
  );
};
