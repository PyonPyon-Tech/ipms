import { FC, useState } from "react";
import { useFormContext } from "react-hook-form";
import { CsrResultAdditionalDetail } from "./additionalDetail";
import { CsrDetailArea } from "@models/report/CsrAnswer/CsrDetailArea";

export const CsrFindingAreaDetail: FC<CsrDetailArea> = ({
  id,
  displayNumber,
  area,
  finding,
  status,
  recommendation,
  imageUrls,
}) => {
  console.log(imageUrls);
  const [yes, setYes] = useState(false);
  const answerOption = ["Tidak Ada", "Ya", "Tidak"];
  return (
    <div className="mb-4 flex w-full">
      <div className="pr-2 text-sm md:text-base lg:text-lg">{displayNumber}.</div>
      <div className="w-full text-xs md:text-sm lg:text-base">
        <h6 className="mb-2 text-sm font-medium md:text-base lg:text-lg">{finding}</h6>
        <div className="mb-2 flex gap-x-5">
          <div className="flex items-center gap-x-2">
            <input checked disabled type="radio" id="type-1" value="1" />
            <label htmlFor="type-1">{answerOption[status-1]}</label>
          </div>
        </div>
        {answerOption[status-1] == "Ya"? <CsrResultAdditionalDetail type="detailAreas" id={id} recommendations={recommendation} imageUrls={imageUrls}/>:
        <text></text>}
      </div>
    </div>
  );
};
