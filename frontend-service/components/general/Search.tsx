import { FC, useState } from "react";

export const Search: FC<{
  setSearchTerm: any;
  placeholder: string;
}> = ({ setSearchTerm, placeholder }) => {
    const [term, setTerm] = useState<string>("");

  return (
    <div className="relative w-4/5 max-w-[500px] mb-4">
      <img
        src="/icons/search.svg"
        className="absolute top-1/2 left-4 -translate-y-1/2 md:scale-[180%]"
      />
      <input
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            setSearchTerm(term);
          }
        }}
        className="w-full rounded-md border border-black py-2 pl-10 pr-4 projectFont"
        placeholder={placeholder}
      />
    </div>
  );
};
