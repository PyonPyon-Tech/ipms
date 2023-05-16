import { classNames } from "@functions/classNames";
import { FC, ReactNode } from "react";

export const Container: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      className={classNames(
        "shadow-basic flex w-full flex-col items-center rounded-md p-4 md:flex-row xl:p-8",
        className
      )}
    >
      {children}
    </div>
  );
};
