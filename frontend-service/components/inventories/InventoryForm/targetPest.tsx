import { Button } from "@components/general/Button";
import { Pest } from "@models/pestcontrol/Pest";
import { FC, useEffect } from "react";
import { useFieldArray, useFormContext } from "react-hook-form";
import toast from "react-hot-toast";

export const TargetPestContainer: FC<{ pestData: Pest[] }> = ({ pestData }) => {
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({
    name: "target", // unique name for your Field Array
  });
  return (
    <>
      <h5 className="text-base font-bold">Aturan Pakai</h5>
      <div className="w-full">
        {fields.map((field, index) => (
          <TargetPestItem
            key={field.id}
            id={field.id}
            index={index}
            pestData={pestData}
            remove={() => {
              if (fields.length == 1) {
                toast.error("Minimal 1 aturan pakai");
              } else {
                remove(index);
              }
            }}
          />
        ))}
      </div>
      <Button
        className="bg-teal-dark"
        action={{
          name: "tambah",
          func: () => append({}),
        }}
      />
    </>
  );
};

const TargetPestItem: FC<any> = ({ id, index, remove, pestData }) => {
  const { register } = useFormContext();
  return (
    <div className="mb-2 flex w-full items-baseline sm:mb-0">
      <div className="mx-1 text-sm font-medium">{index + 1}.</div>
      <div className="flex w-full flex-wrap items-end gap-x-4">
        <div className="w-full sm:w-44 md:w-52">
          <h5 className="pl-1 text-sm font-medium">Hama</h5>
          <select
            className="max-w-none"
            required
            {...register(`target.${index}.pestId`, { required: true })}
          >
            {(pestData as Pest[]).map((x) => (
              <option key={`pest-${id}-${x.id}`} value={x.id}>
                {x.name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full sm:w-44 md:w-52">
          <h5 className="pl-1 text-sm font-medium">Dosis</h5>
          <input
            key={id} // important to include key with field's id
            {...register(`target.${index}.dosage`, { required: true })}
            className="placeholder:font-medium placeholder:text-black"
            placeholder="contoh: Spraying 2.5 ml/10m2"
          />
        </div>
        <div>
          <Button
            className="mt-4 -translate-y-2 bg-coral sm:mt-0"
            action={{
              name: "hapus",
              func: remove,
            }}
          />
        </div>
      </div>
    </div>
  );
};
