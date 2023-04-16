import { useRouter } from "next/router";
import { FC, ReactNode } from "react";

export const Title: FC<{
  title: string;
  action?: { name: string; path: string };
  children?: ReactNode;
}> = ({ action, children, title }) => {
  const router = useRouter();
  return (
    <div className="mb-4 font-bold">
      <div className="flex items-center justify-between">
        <h2 className="text-xl md:text-3xl">{title}</h2>
        {!!action && (
          <div
            onClick={() => router.push(action.path)}
            className="cursor-pointer rounded-lg bg-blue py-1 px-2 text-xs font-medium text-white md:py-2 md:px-3 md:text-sm"
          >
            {action.name}
          </div>
        )}
      </div>
      {children}
    </div>
  );
};
