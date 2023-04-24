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
import { AxiosClient, URL_REPORT } from "@constants/api";
import { toast } from "react-hot-toast";
import { Button } from "@components/general/Button";

export const CsrForm: FC = () => {
  const { initialData, getInitialData, upload } = useCsrForm();
  const methods = useForm();
  const router = useRouter();
  return (
    <FormProvider {...methods}>
      <form
        className="w-0 min-w-full"
        onSubmit={methods.handleSubmit(async (e) => {
          if (!upload) return;
          console.log(e)
          const csrData = await upload(e);
          if (!csrData) return;
          AxiosClient.post(URL_REPORT, csrData)
            .then((response) => {
              toast.success("Sukses menyimpan report");
              console.log(response.data);
            })
            .catch((error) => {
              console.error(error);
              toast.error("Terdapat masalah saat menyimpan");
            });
        })}
      >
        <CsrFormHead />
        <CsrFormAreaFinding />
        <CsrFormPestFinding />
        <CsrFormPesticideUsage />
        <CsrFormSignatures />
        <CsrFormVisitationPhoto />
        <div className="flex items-center justify-center">
          <Button className="bg-teal" action={{ name: "Simpan", submit:true }}></Button>
          {/* <button
            type="submit"
            className="mx-auto rounded-xl bg-teal px-3 py-2 font-bold text-white md:text-lg lg:text-[20px]"
          >
            Simpan Laporan
          </button> */}
        </div>
      </form>
    </FormProvider>
  );
};
