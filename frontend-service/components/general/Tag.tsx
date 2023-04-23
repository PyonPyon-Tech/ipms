import { FC } from "react";

export const Tag: FC<{
    title?: string;
    isActive?: number;
    className?: string;
}> = ({ className, isActive, title }) => {
    let isNull = null;
    if (isActive != null) {
        isNull = 1
    }
    return (
        <div className="flex items-center justify-between">
                <div
                    className={`rounded-full py-1 px-4 text-center text-xs text-white md:text-base ${
                        isActive ? "bg-teal" : "bg-coral"
                    }`}
                >
                    <p> {isActive ? "Aktif" : "Non-Aktif"}</p>
                </div>
            {!!isActive && (
            <div
                className={`rounded-full bg-blue py-1 px-4 text-center text-xs text-white md:text-base`}
            >
                <p> Test</p>
            </div>
            )}
        </div>
    );
};
