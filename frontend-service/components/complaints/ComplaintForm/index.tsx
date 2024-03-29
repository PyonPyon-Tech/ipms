import { Button } from "@components/general/Button";
import { Container } from "@components/general/Container";
import { AxiosClient, URL_CUSTOMER } from "@constants/api";
import { ComplaintMutation } from "@models/customer/complaint";
import {
  ComplaintFields,
  ComplaintFormFactory,
} from "@models/customer/complaint/form";
import { Outlet } from "@models/customer/outlet";
import { CsrReport, CsrReportClass } from "@models/report/CsrReport";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const ComplaintForm: FC<{ outlets: Outlet[]  }> = ({
  outlets,
}) => {
  const router = useRouter();
  const { register, handleSubmit } = useForm<ComplaintFields>();
  const [outletId, setOutletId] = useState<string>('');
  const [reports, setReports] = useState<CsrReport[]>([]);

  useEffect(() => {
    async function retrieveReports(outletId: string) {
      if (!outletId) return setReports([]);
      
      AxiosClient.get(`${URL_CUSTOMER}/outlets/${outletId}/reports`)
        .then((response) => {
          setReports(response.data.map((x: any) => new CsrReportClass(x)));
          console.log(response.data);
        })
        .catch((err: AxiosError) => {
          toast.error(err.message);
          console.log(err);
        });
    }
    retrieveReports(outletId);
  }, [outletId]);

  const onSubmit = async (data: ComplaintFields) => {
    let complaint: ComplaintMutation | null = null;

    complaint = ComplaintFormFactory.complaintMutationFromData(data);

    if (!complaint.outlet)
      return toast.error(`Mohon pilih outlet untuk dikomplain.`);

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
        <h5>Outlet</h5>
        <select {...register("outlet")} className="w-full  max-w-screen-sm min-[320px]:max-w-md" 
                onChange={(e) => setOutletId(e.target.value)} >
            <option selected disabled value=''>
              -
            </option>
            {outlets.map((outlet) => (
                <option
                    value={outlet.id}
                    key={"out" + outlet.id}
                >{`${outlet.name}`}</option>
            ))}
        </select>

        <h5>Kunjungan</h5>
        <select {...register("report")} className="w-full max-w-screen-sm min-[320px]:max-w-md" >
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