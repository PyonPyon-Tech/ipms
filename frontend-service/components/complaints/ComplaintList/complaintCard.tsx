import { Tag } from "@components/general/Tag";
import { ROLES } from "@constants/roles";
import { useAuth } from "@hooks/useAuth";
import { Complaint } from "@models/customer/complaint";
import { useRouter } from "next/router";
import { FC } from "react";

export const ComplaintCard: FC<Complaint> = ({
  id,
  customer: { id: customerId, user: customerUser },
  outlet: { id: outletId, name: outletName },
  content,
  period,
  report = null,
  isAcknowledged,
  date,
  time,
}) => {
  const router = useRouter();
  const periodString = `${
    period.month.charAt(0).toUpperCase() + period.month.slice(1).toLowerCase()
  } ${period.year}`;
  const { user } = useAuth();

  return (
    <div
      onClick={() => {
        router.push(`/complaints/${id}`);
      }}
      className="mb-4 flex w-full cursor-pointer items-center justify-between rounded-md py-2 px-4 shadow-basic md:py-4 md:px-12"
      key={id + "k"}
    >
      <div className="flex items-center gap-x-2 md:gap-x-4">
        <img
          className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16"
          src="/icons/person.svg"
        />
        <div className="">
          <h5 className="text-sm font-bold md:mb-1 md:text-xl">
            {ROLES[user?.role ?? 0] == "Customer"
              ? report == null
                ? `Komplain Umum ${outletName}`
                : `Komplain Kunjungan ${report.outlet.name}`
              : customerUser.name}
          </h5>
          <div>
            <table className="table-auto text-xs font-medium md:text-sm">
              <tbody>
                <tr>
                  {!report && (
                    <>
                      <td className="pr-4">Tanggal: {date}</td>
                      {ROLES[user?.role ?? 0] != "Customer" && (
                        <td className="pr-4">Outlet: {`${outletName}`}</td>
                      )}
                    </>
                  )}
                  {!!report && (
                    <>
                      <td className="pr-4">
                        Tanggal Kunjungan: {`${report.date}`}
                      </td>
                      <td className="pr-4">
                        Teknisi: {`${report.technician.user.name}`}
                      </td>
                      {ROLES[user?.role ?? 0] != "Customer" && (
                        <td className="pr-4">
                          Outlet: {`${report.outlet.name}`}
                        </td>
                      )}
                    </>
                  )}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {!!isAcknowledged && (
        <Tag key={id + "tag"} title={"Diproses"} className={"bg-teal"}></Tag>
      )}
      {!isAcknowledged && (
        <Tag
          key={id + "tag"}
          title={"Belum Diproses"}
          className={"bg-coral"}
        ></Tag>
      )}
    </div>
  );
};
