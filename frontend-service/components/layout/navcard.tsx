import { NavigationCardProps } from "@type/navigationCardProps";
import { useRouter } from "next/router";
import { FC } from "react";

export const NavigationCard: FC<NavigationCardProps> = ({
  icon,
  path,
  name,
}) => {
  const router = useRouter()
  return (
    <div onClick={()=>router.push(path)} className="cursor-pointer bg-white font-semibold gap-x-2 rounded-xl p-2.5 text-xs text-blue md:p-4 md:text-base flex">
      <img className="md:scale-150" src={`/icons/${icon}.svg`} />
      <h4>{name}</h4>
    </div>
  );
};
