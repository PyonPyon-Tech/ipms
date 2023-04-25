import { classNames } from "@functions/classNames";
import { FC, ReactNode } from "react";

export const Container: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={classNames(
        "shadow-basic flex w-full flex-col items-center rounded-md p-4 md:flex-row md:gap-x-10 md:p-8 lg:gap-x-16 xl:p-10 ",
        className
      )}
    >
      {children}
    </div>
  );
};
