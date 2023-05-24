import { useCsrForm } from "@hooks/useCsrForm";
import { FC } from "react";
import { CsrFormGroupContainer } from "./container";
import { useFieldArray } from "react-hook-form";
import { CsrFormPesticideUsageDetail } from "../item/pesticideUsage";
import { Button } from "@components/general/Button";

export const CsrFormPesticideUsage: FC = () => {
  const { initialData } = useCsrForm();
  const { append, fields, remove } = useFieldArray({
    name: "pesticideUsages",
  });
  if (!initialData) return <div></div>;

  return (
    <div>
      <CsrFormGroupContainer section="" title="Penggunaan Pestisida">
        {fields.map((field, index) => (
          <CsrFormPesticideUsageDetail
            key={field.id}
            id={field.id}
            index={index}
            remove={remove}
          />
        ))}
        <div className="flex w-full flex-col items-start">
          <Button
            action={{
              name: "Tambah",
              func: () => append({}),
            }}
          ></Button>
        </div>
      </CsrFormGroupContainer>
    </div>
  );
};
