import router, { useRouter } from "next/router";
import { FC, ReactNode } from "react";
import { Button } from "./Button";

export const Title: FC<{
    title: string;
    action?: {
        name?: string;
        path?: string;
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
                    <Button
                        action={{
                            name: action?.name ?? '',
                            func: () => router.push(action?.path ?? ''),
                        }}
                    ></Button>
                )}
                </div>
            </div>
            {children}
        </div>
    );
};
