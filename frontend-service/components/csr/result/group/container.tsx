import { CsrArea } from "@models/report/CsrQuestion/CsrFindingArea";
import { FC, ReactNode, useState } from "react";

export const CsrResultGroupContainer: FC<{ children: ReactNode; title: string; section: string }> = ({
  children,
  section,
  title,
}) => {
  const [open, setOpen] = useState(true);
  return (
    <section className="mt-4 rounded-md border border-[#1E1E1E] bg-[#FCFCFC]">
      <div
        onClick={() => setOpen(!open)}
        className={`relative flex cursor-pointer p-4 font-bold transition-colors duration-200 hover:bg-[#f4f4f4] rounded-[20px] md:p-5 md:text-lg lg:text-[20px] ${
          open && "border-b border-[#000000] rounded-b-[0px] "
        }`}
      >
        <span className="mr-2">{!!section ? `${section}.`:""}</span>
        <span>{title}</span>
        <img
          src="/icons/arrow-up.svg"
          className={`absolute right-4 top-1/2 -translate-y-1/2 scale-75 transition-all ${open ? "rotate-0" : "rotate-180"}`}
        />
      </div>
      <div className={`p-4 md:p-5 ${!open && "hidden"}`}>{children}</div>{" "}
    </section>
  );
};
