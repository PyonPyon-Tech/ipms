import { CsrFindingArea } from "@models/report/CsrQuestion/CsrFindingArea";
import { FC, useState } from "react";
import { useFormContext } from "react-hook-form";
import { CsrFormAdditionalDetail } from "./additionalDetail";

export const CsrFormFindingAreaDetail: FC<CsrFindingArea> = ({
  displayNumber,
  id,
  question,
  recommendations = [],
  area,
}) => {
  const [yes, setYes] = useState(false);
  const { register } = useFormContext();
  return (
    <div className="mb-4 flex w-full">
      <div className="pr-2 text-sm md:text-base lg:text-lg">{displayNumber}.</div>
      <div className="w-full text-xs md:text-sm lg:text-base">
        <h6 className="mb-2 text-sm font-medium md:text-base lg:text-lg">{question}</h6>
        <div className="mb-2 flex gap-x-5">
          <div className="flex items-center gap-x-2">
            <input
              {...register(`area.${id}.status`)}
              onChange={() => setYes(false)}
              className="m-0 w-auto"
              type="radio"
              id={`area.${id}.status.1`}
              value="1"
              defaultChecked
            />
            <label htmlFor={`area.${id}.status.1`}>Tidak Ada</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              {...register(`area.${id}.status`)}
              onChange={() => setYes(true)}
              className="m-0 w-auto"
              type="radio"
              id={`area.${id}.status.2`}
              value="2"
            />
            <label htmlFor={`area.${id}.status.2`}>Ya</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              {...register(`area.${id}.status`)}
              onChange={() => setYes(false)}
              className="m-0 w-auto"
              type="radio"
              id={`area.${id}.status.3`}
              value="3"
            />
            <label htmlFor={`area.${id}.status.3`}>Tidak</label>
          </div>
        </div>
        <CsrFormAdditionalDetail type="area" id={id} recommendations={recommendations} yes={yes} />
      </div>
    </div>
  );
};
