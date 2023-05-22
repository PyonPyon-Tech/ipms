import { Button } from "@components/general/Button";
import { Container } from "@components/general/Container";
import { Tag } from "@components/general/Tag";
import { Title } from "@components/general/Title";
import { AxiosClient, URL_CUSTOMER, URL_INVENTORY } from "@constants/api";
import { ROLES } from "@constants/roles";
import { useAuth } from "@hooks/useAuth";
import { Complaint } from "@models/customer/complaint";
import moment from "moment";
import router from "next/router";
import out from "pages/inventories/out";
import { FC } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const ComplaintDetail: FC<Complaint> = ({
  content,
  customer,
  date,
  id,
  isAcknowledged,
  outlet,
  period,
  time,
  report,
}) => {
  const { user } = useAuth();

  moment.locale("id");
  const tanggalKomplain = moment(new Date(date)).format("dddd, D MMMM Y");
  const tanggalTreatment = moment(new Date(report?.date ?? "")).format(
    "dddd, D MMMM Y"
  );
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data: any) => {
    console.log(data);
    const submittedData = {
      isAcknowledged: 1,
    };
    if (isAcknowledged == 1) {
      toast.error("Komplain sudah diproses!");
    } else {
      AxiosClient.put(
        `${URL_CUSTOMER}/complaints/${router.query.id}`,
        submittedData
      )
        .then((response) => {
          console.log(response.data);
          toast.success("Sukses memproses keluhan", {
            duration: 5000,
          });
          router.push(`/complaints/${router.query.id}`);
        })
        .catch((error) => {
          toast.error(error.message);
          console.log(error);
        });
    }
  };

  return (
    <Container>
      <div className="w-full">
        <div className="flex items-center justify-between">
          <h1 className="mb-2 text-2xl font-bold">
            {customer.user.name}-Komplain-{id}
          </h1>
          <div className="flex gap-2">
            {!!isAcknowledged && (
              <Tag
                key={id + "tag"}
                title={"Diproses"}
                className={"bg-teal"}
              ></Tag>
            )}
            {!isAcknowledged && (
              <Tag
                key={id + "tag"}
                title={"Belum Diproses"}
                className={"bg-coral"}
              ></Tag>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <input className="hidden" value={1} type="number" {...register("isAcknowledged")} />
              {ROLES[user?.role ?? 0] == "Supervisor" &&
                isAcknowledged == 0 && (
                  <Button
                    className="bg-teal"
                    action={{
                      name: "Proses Komplain",
                      func: () => {
                        router.push("/complaints/" + report?.id);
                      },
                      submit: true,
                    }}
                  ></Button>
                )}
            </form>
          </div>
        </div>

        <div className="mb-4 flex gap-2">
          <div>
            <h6>Pengirim komplain</h6>
            <h6>Tanggal komplain</h6>
          </div>
          <div>
            <h6 className="font-bold">: {outlet.name}</h6>
            <h6 className="font-bold">: {tanggalKomplain}</h6>
          </div>
        </div>
        <div className="mb-4 flex items-center justify-between gap-8">
          <p>
            Komplain untuk treatment pada <b>{tanggalTreatment}</b> dengan
            teknisi <b>{report?.technician.user.name}</b>
          </p>
          <Button
            action={{
              name: "Buka Report",
              func: () => {
                router.push("/reports/detail/" + report?.id);
              },
            }}
          ></Button>
        </div>
        <Container className="mb-4 shadow-coral">
          <p className="text-xl">"{content}"</p>
        </Container>
        <h5 className="text-sm font-bold md:mb-1 md:text-xl"></h5>
      </div>
    </Container>
  );
};
