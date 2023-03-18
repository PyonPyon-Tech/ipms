import { classNames } from "@functions/classNames";
import { FC, ReactNode } from "react";

export const Container: FC<{ children: ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <div
      style={{
        boxShadow:
          "4px 4px 4px rgba(0, 0, 0, 0.25), -4px -4px 4px rgba(0, 0, 0, 0.25)",
      }}
      className={classNames(
        "flex w-full flex-col items-center p-6 md:flex-row md:gap-x-10 md:p-12 lg:gap-x-16 xl:p-16 ",
        className
      )}
    >
      {children}
    </div>
  );
};
