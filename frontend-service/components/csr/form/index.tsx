import { useCsrForm } from "@hooks/useCsrForm";
import { useRouter } from "next/router";
import { FC, useEffect } from "react";
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
import { useAuth } from "@hooks/useAuth";

export const CsrForm: FC = () => {
  const { upload, initialData, getInitialData } = useCsrForm();
  const methods = useForm({
    defaultValues:{
      date: new Date().toISOString().substring(0, 10)
    }
  });

  const { user } = useAuth();
  const router = useRouter();

  let tanggal = new Date();

  useEffect(() => {
    if (!user) return;
    getInitialData(user?.id, tanggal);
  }, [user]);

  return initialData != null? (
    <FormProvider {...methods}>
      <form
        className="mb-20 w-0 min-w-full"
        onSubmit={methods.handleSubmit(async (e) => {
          if (!upload) return;
          const data = {
            ...e,
            time: new Date().toLocaleTimeString("en-ID", { hour: "2-digit", minute: "2-digit", hour12: false }),
          };
          console.log(data);
          const csrData = await upload(data);
          if (!csrData) return;
          AxiosClient.post(URL_REPORT, csrData)
            .then(({ data }) => {
              toast.success("Sukses menyimpan report");
              console.log(data);
              router.push(`/reports/detail/${data.id}`);
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
        <CsrFormSignatures technicianName={user?.name!}/>
        <CsrFormVisitationPhoto />
        <div className="flex items-center justify-center">
          <Button className="bg-teal" action={{ name: "Simpan", submit: true }}></Button>
        </div>
      </form>
    </FormProvider>
  ):
  <div className="md:flex md:flex-row">
    <div className="flex justify-center px-3">
      <img className="max-w-[128px] min-w-[60px]" src="/icons/warning-circle.svg"></img>
    </div>
    <div className="items-start">
      <h2 className="text-gray text-xl text-center md:text-start md:items-start md:text-2xl font-bold pb-3">TIDAK ADA JADWAL UNTUK TANGGAL, {tanggal.toLocaleDateString("id", {
            day: "numeric",
            month: "long",
            year: "numeric",
          }).toUpperCase()}!</h2>
      <h6 className="text-gray text-center md:text-start md:text-lg lg:text-[20px]">
        Sepertinya Anda belum memiliki jadwal untuk tanggal 24 Maret 2023,<br></br> tambahkan jadwal atau minta supervisor untuk menambahkan jadwal Anda!
      </h6>
    </div>
  </div>
  ;
};
