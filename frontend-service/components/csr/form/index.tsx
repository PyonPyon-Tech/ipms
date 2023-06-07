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
    defaultValues: {
      date: new Date().toISOString().substring(0, 10),
    },
  });

  const { user } = useAuth();
  const router = useRouter();

  let tanggal = new Date();

  useEffect(() => {
    if (!user) return;
    getInitialData(user?.id, tanggal);
  }, [user]);

  return (
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
        <CsrFormSignatures technicianName={user?.name!} />
        <CsrFormVisitationPhoto />
        <div className="flex items-center justify-center">
          <Button className="bg-teal" action={{ name: "Simpan", submit: true }}></Button>
        </div>
      </form>
    </FormProvider>
  );
};