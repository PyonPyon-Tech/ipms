import { FC } from "react";

export const Button: FC<{
    className?: string;
    action: {
        name: string;
        submit?: boolean;
        func?: () => void;
    };
}> = ({ action, className }) => {
    let submit: any = "";
    if (action?.submit == true) {
        submit = submit;
    }
    return (
        <div className="flex items-center justify-between">
            {!!action && (
                <button
                    onClick={action.func}
                    className={`cursor-pointer rounded-md bg-blue py-2 px-3 text-xs font-bold text-white md:py-2 md:px-3 md:text-sm ${className}`}
                    type={submit}
                >
                    <p>{action.name}</p>
                </button>
            )}
        </div>
    );
};
