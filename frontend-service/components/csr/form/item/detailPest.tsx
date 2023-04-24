import { useCsrForm } from "@hooks/useCsrForm";
import { FC, useEffect, useState } from "react";
import {
  Controller,
  UseFieldArrayRemove,
  useFormContext,
  useWatch,
} from "react-hook-form";
import Select from "react-select";
import CreatableSelect from "react-select/creatable";
import { CsrFormAdditionalDetail } from "./additionalDetail";
import { Button } from "@components/general/Button";
export const CsrFormFindingPestDetail: FC<{
  index: number;
  id: string;
  remove: UseFieldArrayRemove;
}> = ({ index, id, remove }) => {
  const { initialData } = useCsrForm();
  const { register, control } = useFormContext();
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const namepath = `detailPests.${index}`;
  const selectedPest = useWatch({
    control,
    name: `${namepath}.pest`, // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
  });

  useEffect(() => {
    if (!selectedPest) return;
    setRecommendations(
      initialData?.pests.find((p) => (p.id = selectedPest.value))
        ?.recommendations ?? []
    );
  }, [selectedPest]);

  if (!initialData) return <div></div>;
  const { pests } = initialData;
  return (
    <div
      key={id}
      className="mb-8 flex items-baseline text-sm md:text-base lg:text-lg"
    >
      <div className="grow">
        <div className="mb-1 text-sm font-medium md:text-base lg:text-lg">{`(${String.fromCharCode(
          index + 65
        )}) Temuan Hama`}</div>
        <div className="mb-1 flex justify-between gap-x-3 md:gap-x-8">
          <Controller
            name={`${namepath}.pest`}
            control={control}
            render={({ field }) => (
              <CreatableSelect
                {...field}
                isSearchable
                autoFocus
                placeholder="Pilih Hama"
                className="grow"
                formatCreateLabel={(inputValue: string) =>
                  `Tambahkan Hama "${inputValue}"`
                }
                options={pests.map((pest) => {
                  return {
                    value: pest.id,
                    label: pest.pest.name,
                  };
                })}
              />
            )}
          />
          <Button
            className="bg-orange"
            action={{
              name: "Login",
              func: () => remove(index)
            }}
            img="/icons/trash-white.svg"
          ></Button>
          <div
            onClick={() => remove(index)}
            className="flex h-8 w-10 cursor-pointer items-center justify-center rounded-lg bg-orange px-3 py-1 md:h-10 md:w-14 md:px-4 md:py-2"
          >
            <img src="/icons/trash-white.svg" />
          </div>
        </div>
        <div className="mb-1 flex gap-x-4 pl-1">
          <div className="text-sm font-medium md:text-base lg:text-lg">
            Level Hama:
          </div>
          <div className="flex items-center gap-x-2">
            <input
              {...register(`${namepath}.status`)}
              className="m-0 w-auto"
              type="radio"
              id={`${namepath}.status.1`}
              value="2"
            />
            <label htmlFor={`${namepath}.status.1`}>Potensi</label>
          </div>
          <div className="flex items-center gap-x-2">
            <input
              {...register(`${namepath}.status`)}
              className="m-0 w-auto"
              type="radio"
              id={`${namepath}.status.2`}
              value="3"
            />
            <label htmlFor={`${namepath}.status.2`}>Aktual</label>
          </div>
        </div>
        {/* ini buat foto */}
        <div className="flex items-start gap-x-4 pl-1">
          <div className="grow">
            <CsrFormAdditionalDetail
              id={index}
              recommendations={recommendations}
              type="detailPests"
              yes
            />
          </div>
        </div>
      </div>
    </div>
  );
};
