import { useCsrForm } from "@hooks/useCsrForm";
import { FC } from "react";
import { CsrFormGroupContainer } from "./container";
import { useFieldArray } from "react-hook-form";
import { CsrFormPesticideUsageDetail } from "../item/pesticideUsage";

export const CsrFormPesticideUsage: FC = () => {
  const { initialData } = useCsrForm();
  const { append, fields, remove } = useFieldArray({
    name: "pesticideUsage",
  });
  if (!initialData) return <div></div>;

  return (
    <div>
      <CsrFormGroupContainer section="" title="Penggunaan Pestisida">
        {fields.map((field, index) => (
          <CsrFormPesticideUsageDetail key={field.id} id={field.id} index={index} remove={remove} />
        ))}
        <div className="flex w-full flex-col items-start">
          <div
            onClick={() => append({})}
            className="flex cursor-pointer rounded-xl bg-blue px-3 py-2 font-semibold text-white"
          >
            Tambah
          </div>
        </div>
      </CsrFormGroupContainer>
    </div>
  );
};
