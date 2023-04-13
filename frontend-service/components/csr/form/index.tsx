import { useCsrForm } from "@hooks/useCsrForm";
import { useRouter } from "next/router";
import { FC } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { CsrFormAreaFinding } from "./group/area";
import { CsrFormHead } from "./head";
import { CsrFormPestFinding } from "./group/pest";
import { CsrFormPesticideUsage } from "./group/pesticide";
import { CsrFormSignatures } from "./group/signatures";
import { CsrFormVisitationPhoto } from "./item/visitationPhoto";

export const CsrForm: FC = () => {
  const { initialData, getInitialData } = useCsrForm();
  const methods = useForm();
  const router = useRouter();
  return (
    <FormProvider {...methods}>
      <form
        className="w-0 min-w-full border"
        onSubmit={methods.handleSubmit((e) => {
          console.log(e);
        })}
      >
        <CsrFormHead />
        <CsrFormAreaFinding />
        <CsrFormPestFinding />
        <CsrFormPesticideUsage />
        <CsrFormSignatures />
        <CsrFormVisitationPhoto />
        <div className="flex items-center justify-center">
          <button
            type="submit"
            className="mx-auto rounded-xl bg-teal px-3 py-2 font-bold text-white md:text-lg lg:text-[20px]"
          >
            Simpan Laporan
          </button>
        </div>
      </form>
    </FormProvider>
  );
};
