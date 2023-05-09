import { Button } from "@components/general/Button";
import { Container } from "@components/general/Container";
import { AxiosClient, URL_CUSTOMER } from "@constants/api";
import { ComplaintMutation } from "@models/customer/complaint";
import {
  ComplaintFields,
  ComplaintFormFactory,
} from "@models/customer/complaint/form";
import { CsrReport } from "@models/report/CsrReport";
import { useRouter } from "next/router";
import { FC } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const ComplaintForm: FC<{ reports: CsrReport[] }> = ({
  reports,
}) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<ComplaintFields>();

  const onSubmit = async (data: ComplaintFields) => {
    let complaint: ComplaintMutation | null = null;

    complaint = ComplaintFormFactory.complaintMutationFromData(data);

    AxiosClient.post(
      `${URL_CUSTOMER}/complaints`,
      complaint,
    )
      .then((response) => {
        console.log(response.data);
        toast.success("Sukses membuat komplain", {
          duration: 5000
        });
        router.push(`/complaints/${response.data.id}`);
      })
      .catch((error) => {
        if (error.message.includes("400"))
            toast.error("Kunjungan sudah dikomplain sebelumnya");
        else toast.error(error.message);
        console.log(error);
      });
  };
  return (
    <div className="shadow-basic w-full flex-col items-center rounded-md p-4 md:flex-row xl:p-8 block">
      <form onSubmit={handleSubmit(onSubmit)} className="detail-form">
        <h5>Kunjungan</h5>
        <select {...register("report")} className="w-full" >
            <option selected value=''>
              -
            </option>
            {reports.map((report) => (
                <option
                    value={report.id}
                    key={"rep" + report.id}
                >{`${report.date} - ${report.technician.user.name}`}</option>
            ))}
        </select>

        <h5>Keluhan</h5>
        <textarea required {...register("content")} className="w-full overflow-scroll h-64 border pl-2 pt-2 border-black rounded-[10px]" />
        
        <Button action={{ name: "Simpan", submit: true }} className="mt-4"></Button>
      </form>
    </div>
  );
};