import { FC } from "react";

export const Tag: FC<{
    title?: string;
    isActive?: number;
    className?: string;
}> = ({ className, isActive, title }) => {
    return (
        <div className="flex items-center justify-between">
            {isActive != null && (
                <div
                    className={`rounded-full py-1 px-4 text-center text-xs font-bold text-white md:text-base ${
                        isActive ? "bg-teal" : "bg-coral"
                    }`}
                >
                    <p> {isActive ? "Aktif" : "Non-Aktif"}</p>
                </div>
            )}
            {isActive == null && (
                <div
                    className={`rounded-full bg-blue py-1 px-4 text-center font-bold text-xs text-white md:text-base ${className} ` }
                >
                    <p> {title} </p>
                </div>
            )}
        </div>
    );
};
