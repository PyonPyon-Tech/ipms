import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

export const TitleInventoryOut: FC<{
  title: string;
  action?: { name: string; func: () => void };
  isCart?: { func: () => void };
  children?: ReactNode;
}> = ({ action, isCart, children, title }) => {
  return (
    <div className="mb-4 font-bold">
      <div className="flex items-center justify-between">
        <div className="flex flex-row">
          {!!isCart && (
            <img
              onClick={isCart.func}
              src="/icons/arrow-up.svg"
              className="-rotate-90"
            />
          )}
          <h2 className="text-xl md:text-3xl">{title}</h2>
        </div>

        {!!action && (
          <div
            onClick={action.func}
            className="cursor-pointer rounded-md bg-blue py-2 px-3 text-xs font-bold text-white md:py-2 md:px-3 md:text-sm"
          >
            <p>{action.name}</p>
          </div>
        )}
      </div>
      {children}
    </div>
  );
};
