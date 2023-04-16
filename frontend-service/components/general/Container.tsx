import { classNames } from "@functions/classNames";
import { FC, ReactNode } from "react";

export const Container: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      style={{
        boxShadow:" 0px 0px 5px 0px rgba(197, 197, 197, 1)"
      }}
      className={classNames(
        "flex w-full flex-col items-center rounded-[5px] p-6 md:flex-row md:gap-x-10 md:p-12 lg:gap-x-16 xl:p-16 ",
        className
      )}
    >
      {children}
    </div>
  );
};
