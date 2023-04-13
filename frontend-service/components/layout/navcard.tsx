import { NavigationCardProps } from "@type/navigationCardProps";
import { useRouter } from "next/router";
import { FC } from "react";

export const NavigationCard: FC<NavigationCardProps> = ({
  path,
  name,
}) => {
  const router = useRouter()
  return (
    <div onClick={() => router.push(path)} className="pl-8 md:pl-10 hover:brightness-50 cursor-pointer bg-white font-semibold gap-x-2 text-xs text-blue md:py-4 md:text-base py-4 flex">
      <h4>{name}</h4>
    </div>
  );
};
