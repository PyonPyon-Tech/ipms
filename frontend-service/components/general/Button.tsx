import { Router, useRouter } from "next/router";

import { FC } from "react";

function checkColor(color?: string) {
    let bg = "";
    if (color == "coral") {
        bg = "#EF7373";
    } else if (color == "coral-light") {
        bg = "#E8AAAA";
    } else if (color == "coral-dark") {
        bg = "#CB4C4B";
    } else if (color == "orange") {
        bg = "#F87E0D";
    } else if (color == "orange-light") {
        bg = "#F3AD6B";
    } else if (color == "orange-dark") {
        bg = "#C55E00";
    } else if (color == "teal") {
        bg = "#47BEAB";
    } else if (color == "teal-light") {
        bg = "#6EE3D1";
    } else if (color == "teal-dark") {
        bg = "#339082";
    } else if (color == "blue-light") {
        bg = "#4A9AE8";
    } else if (color == "blue-dark") {
        bg = "#004F9C";
    } else if (color == "regal-blue") {
        bg = "#243c5a";
    } else if (color == "white") {
        bg = "#FCFCFC";
    } else if (color == "grey") {
        bg = "#C5C5C5";
    } else if (color == "grey-dark") {
        bg = "#A7A5A5";
    } else if (color == "black") {
        bg = "#1E1E1E";
    } else {
        // blue
        bg = "#006BD3";
    }

    return bg;
}

export const Button: FC<{
    action?: {
        name?: string;
        path: string;
        bgColor?: string;
        textColor?: string;
        submit?: boolean;
    };
}> = ({ action }) => {
    const router = useRouter();
    let bgcolor = checkColor(action?.bgColor);
    let textColor = "";
    let submit: any = "";
    if (action?.submit == true) {
        submit = submit;
    }
    if (action?.textColor == null) {
        textColor = "#FCFCFC";
    } else {
        textColor = checkColor(action?.textColor);
    }
    console.log(action?.path);
    return (
        <div className="flex items-center justify-between">
            {!!action && (
                <button
                    onClick={() => router.push(action.path)}
                    className="cursor-pointer rounded-lg bg-blue py-2 px-3 text-xs font-bold text-white md:py-2 md:px-3 md:text-sm"
                    style={{ backgroundColor: bgcolor, color: textColor }}
                    type={submit}
                >
                    <p>{action.name}</p>
                </button>
            )}
        </div>
    );
};
