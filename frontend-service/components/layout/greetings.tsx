import { FC } from "react";

export const Greetings: FC = () => {
  return (
    <div className="hidden items-center gap-x-7 md:flex">
      <div className="text-right font-bold text-blue">
        <h3 className="text-2xl">Hi, Sultan fahrezy</h3>
        <h4>Manajer</h4>
      </div>
      <img src="/icons/account.svg" />
    </div>
  );
};
