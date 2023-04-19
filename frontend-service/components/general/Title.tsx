import router, { useRouter } from "next/router";
import { FC, ReactNode } from "react";

export const Title: FC<{
    title: string;
    action?: {
        name?: string;
        path: string;
        bgColor?: string;
        textColor?: string;
        submit?: boolean;
    };
    children?: ReactNode;
}> = ({ action, children, title }) => {
    return (
        <div className="mb-4 font-bold">
            <div className="flex items-center justify-between">
                <h2 className="text-xl md:text-3xl">{title}</h2>
                <div className="flex items-center justify-between">
                    {!!action && (
                        <button
                            onClick={() => router.push(action.path)}
                            className="cursor-pointer rounded-md bg-blue py-2 px-3 text-xs font-bold text-white md:py-2 md:px-3 md:text-sm"
                        >
                            <p>{action.name}</p>
                        </button>
                    )}
                </div>
            </div>
            {children}
        </div>
    );
};
