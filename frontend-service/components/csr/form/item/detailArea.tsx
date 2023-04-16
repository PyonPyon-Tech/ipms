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
  const namepath = `detailAreas.${id}`
  return (
    <div className="mb-4 flex w-full">
      <div className="pr-2 text-sm md:text-base lg:text-lg">{displayNumber}.</div>
      <div className="w-full text-xs md:text-sm lg:text-base">
        <h6 className="mb-2 text-sm font-medium md:text-base lg:text-lg">{question}</h6>
        <div className="mb-2 flex gap-x-5">
          <div className="flex items-center gap-x-2">
            <input {...register(`${namepath}.area.id`)} hidden value={area?.id} />
            <input {...register(`${namepath}.displayNumber`)} hidden value={displayNumber} />
            <input {...register(`${namepath}.finding`)} hidden value={question} />
            <input
              {...register(`${namepath}.status`)}
              onChange={() => setYes(false)}
              className="m-0 w-auto"
              type="radio"
              id={`${namepath}.status.1`}
              value="1"
              defaultChecked
            />
            <label htmlFor={`${namepath}.status.1`}>Tidak Ada</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              {...register(`${namepath}.status`)}
              onChange={() => setYes(true)}
              className="m-0 w-auto"
              type="radio"
              id={`${namepath}.status.2`}
              value="2"
            />
            <label htmlFor={`${namepath}.status.2`}>Ya</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              {...register(`${namepath}.status`)}
              onChange={() => setYes(false)}
              className="m-0 w-auto"
              type="radio"
              id={`${namepath}.status.3`}
              value="3"
            />
            <label htmlFor={`${namepath}.status.3`}>Tidak</label>
          </div>
        </div>
        <CsrFormAdditionalDetail type="detailAreas" id={id} recommendations={recommendations} yes={yes} />
      </div>
    </div>
  );
};
