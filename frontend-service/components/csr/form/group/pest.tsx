import { useCsrForm } from "@hooks/useCsrForm";
import { FC, useEffect, useRef, useState } from "react";
import { CsrFormGroupContainer } from "./container";
import { Thumbs } from "../item/thumbs";
import { CsrDetailPest } from "@models/report/CsrAnswer/CsrDetailPest";
import { CsrDetailPestField } from "@models/report/CsrReportField";
import { useFieldArray, useFormContext } from "react-hook-form";
import { CsrFormFindingPestDetail } from "../item/detailPest";

export const CsrFormPestFinding: FC = () => {
  const { initialData } = useCsrForm();
  const { append, fields, remove } = useFieldArray({
    name: "detailPests",
  });
  if (!initialData) return <div></div>;

  return (
    <div>
      <CsrFormGroupContainer
        key={"pest"}
        title="Temuan Hama"
        section=""
      >
        {fields.map((field, index) => (
          <CsrFormFindingPestDetail id={field.id} index={index} remove={remove} key={field.id} />
        ))}
        <div className="flex w-full flex-col items-start">
          <div  onClick={() => append(defaultPest)} className="flex cursor-pointer rounded-xl bg-blue px-3 py-2 font-semibold text-white">Tambah</div>
        </div>
      </CsrFormGroupContainer>
    </div>
  );
};

const defaultPest = {};
