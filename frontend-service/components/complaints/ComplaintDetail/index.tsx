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
    if (isAcknowledged == 1) {
      toast.error("Komplain sudah diproses!");
    } else {
      AxiosClient.post(
        `${URL_CUSTOMER}/complaints/${router.query.id}/acknowledge`
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
          <h1 className="mb-2 text-base font-bold md:text-2xl">
            {customer.user.name}-Komplain-{id}
          </h1>

          {!!isAcknowledged && (
            <Tag
              key={id + "tag"}
              title={"Telah Diproses"}
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
        </div>

        <div className="mb-4 flex flex-col ">
          <h6 className="text-xs md:text-base">
            Pengirim komplain: <b>{outlet.name}</b>
          </h6>
          <h6 className="text-xs md:text-base">
            Tanggal komplain: <b>{tanggalKomplain}</b>
          </h6>
        </div>
        <div className="mb-2 flex items-center justify-between gap-8">
          {report != null && (
            <div>
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
          )}
        </div>
        <Container className="mb-4 shadow-coral">
          <p className="texl-base md:text-xl">"{content}"</p>
        </Container>
        <div className="flex justify-end">
          <form onSubmit={handleSubmit(onSubmit)}>
            {(ROLES[user?.role ?? 0] == "Supervisor" ||
              ROLES[user?.role ?? 0] == "Teknisi") &&
              isAcknowledged == 0 && (
                <Button
                  className="bg-teal"
                  action={{
                    name: "Tandai Selesai",
                    func: () => {
                      router.push("/complaints/" + router.query.id);
                    },
                    submit: true,
                  }}
                ></Button>
              )}
          </form>
        </div>
      </div>
    </Container>
  );
};
