import { useCsrForm } from "@hooks/useCsrForm";
import { FC, useEffect, useState } from "react";
import { Controller, UseFieldArrayRemove, useFormContext, useWatch } from "react-hook-form";
import Select from "react-select";

export const CsrFormPesticideUsageDetail: FC<{ index: number; id: string; remove: UseFieldArrayRemove }> = ({
  id,
  index,
  remove,
}) => {
  const { initialData } = useCsrForm();
  const { register, control, setValue } = useFormContext();
  const [pesticideTarget, setpesticideTarget] = useState<{ target: string; dose: string }[]>([]);
  const [applicationNdosage, setApplicationNDosage] = useState("");
  const namepath = `pesticideUsages.${index}`;
  const selectedBrand = useWatch({
    control,
    name: `${namepath}.name`,
  });
  useEffect(() => {
    if (!selectedBrand) return;
    const selectedPesticide = initialData?.pesticides.find((p) => p.id == selectedBrand.value);
    const targetNDose = selectedPesticide?.targets.split(",");
    const result = targetNDose?.map((x) => {
      const y = x.substring(x.indexOf("(") + 1);
      return {
        target: x.split("(")[0].trim(),
        dose: y.substring(0, y.length - 1),
      };
    });
    setpesticideTarget(result ?? []);
  }, [selectedBrand]);

  if (!initialData) return <div></div>;
  const { pesticides } = initialData;
  const satuan = pesticides.find((p) => p.id == selectedBrand?.value)?.unit.toUpperCase() ?? "";

  return (
    <div key={id} className="mb-8 flex items-baseline">
      <div className="grow">
        <div className="mb-2 flex w-full items-end justify-between gap-3 md:gap-8">
          <Controller
            name={`${namepath}.name`}
            control={control}
            render={({ field }) => (
              <div className="grow">
                <h6 className="mb-1 font-bold">{`(${String.fromCharCode(index + 65)}) Brand`}</h6>
                <Select
                  {...field}
                  isSearchable
                  autoFocus
                  placeholder="Pilih Pestisida"
                  className="grow"
                  options={pesticides.map((pesticide) => {
                    return {
                      value: pesticide.id,
                      label: pesticide.name,
                    };
                  })}
                />
              </div>
            )}
          />
          <div
            onClick={() => remove(index)}
            className="flex h-8 w-10 cursor-pointer items-center justify-center rounded-lg bg-orange px-3 py-1 md:h-10 md:w-14 md:px-4 md:py-2"
          >
            <img src="/icons/trash-white.svg" />
          </div>
        </div>
        <div className="mb-2 w-full">
          <label className="mb-1 font-bold">Bahan Aktif</label>
          <Select
            value={{
              label: pesticides.find((p) => p.id == selectedBrand?.value)?.activeIngredient,
              value: "",
            }}
          />
        </div>
        <div className="mb-2 grid grid-cols-1 gap-3 sm:grid-cols-2 md:gap-8">
          <div className="w-full">
            <label className="mb-1 font-bold">Hama Sasaran</label>
            <Select
              onChange={(e) => {
                setApplicationNDosage(e?.resource ?? "");
              }}
              isSearchable
              placeholder="Pilih Hama"
              className="grow"
              options={pesticideTarget.map((x) => {
                return {
                  value: x.target,
                  label: x.target,
                  resource: x.dose,
                };
              })}
            />
          </div>
          <div className="w-full">
            <label className="mb-1 font-bold">Penggunaan dan Dosis</label>
            <Select
              placeholder="Pilih Hama Sasaran Terlebih Dahulu"
              value={{
                label: applicationNdosage,
                value: applicationNdosage,
              }}
            />
          </div>
        </div>
        <div className="mb-2 flex w-full">
          <div>
            <label className="mb-1 font-bold">
              Jumlah Digunakan {selectedBrand && `[dalam ${satuan.toUpperCase()}]`}
            </label>
            <input
              min={1}
              type="number"
              onChange={(e) => {
                setValue(`${namepath}.amount`, `${e.target.value} ${satuan.toUpperCase()}`);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
