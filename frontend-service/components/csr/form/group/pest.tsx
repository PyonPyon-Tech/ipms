import { useCsrForm } from "@hooks/useCsrForm";
import { FC } from "react";
import { CsrFormGroupContainer } from "./container";
import { Thumbs } from "../item/thumbs";
import { CsrDetailPest } from "@models/report/CsrAnswer/CsrDetailPest";
import { useFieldArray, useFormContext } from "react-hook-form";
import { CsrFormFindingPestDetail } from "../item/detailPest";
import { Button } from "@components/general/Button";

export const CsrFormPestFinding: FC = () => {
  const { initialData } = useCsrForm();
  const { append, fields, remove } = useFieldArray({
    name: "detailPests",
  });
  if (!initialData) return <div></div>;

  return (
    <div>
      <CsrFormGroupContainer key={"pest"} title="Temuan Hama" section="">
        {fields.map((field, index) => (
          <CsrFormFindingPestDetail
            id={field.id}
            index={index}
            remove={remove}
            key={field.id}
          />
        ))}
        <div className="flex w-full flex-col items-start">
          <Button
            className="w-full"
            action={{
              name: "Tambah",
              func: () => append(defaultPest)
            }}
          ></Button>
        </div>
      </CsrFormGroupContainer>
    </div>
  );
};

const defaultPest = {};
