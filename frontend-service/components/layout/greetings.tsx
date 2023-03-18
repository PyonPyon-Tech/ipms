import { ROLES } from "@constants/roles";
import { useAuth } from "@hooks/useAuth";
import { FC } from "react";

export const Greetings: FC = () => {
  const {user, logout}=useAuth()
  return (
    <div className="hidden items-center gap-x-7 md:flex">
      <div className="text-right font-bold text-blue">
        <h3 className="text-2xl">Hi, {!!user && user.name}!</h3>
        <h4>{ROLES[user?.role ?? 0]}</h4>
      </div>
      <img onClick={logout} className="cursor-pointer" src="/icons/account.svg" />
    </div>
  );
};
