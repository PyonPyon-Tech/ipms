import { ROLES } from "@constants/roles";
import { useAuth } from "@hooks/useAuth";
import { FC } from "react";

export const Greetings: FC = () => {
  const {user, logout}=useAuth()
  return (
    <div className="items-center gap-x-3 flex pb-4">
      <img className="cursor-pointer object-fill h-12 w-12" src="/icons/account.svg" />
      <div className="font-bold text-base">
        <h4>{!!user && user.name}</h4>
        <h3 className="font-medium text-sm">{ROLES[user?.role ?? 0]}</h3>
      </div>
    </div>
  );
};
