import { ROLES } from "@constants/roles";
import { useAuth } from "@hooks/useAuth";
import { Complaint } from "@models/customer/complaint";
import { useRouter } from "next/router";
import { FC } from "react";

export const ComplaintCard: FC<Complaint> = ({
  id,
  customer: { id: customerId, user: customerUser },
  content,
  period,
  report = null,
}) => {
  const router = useRouter();
  const periodString = `${period.month.charAt(0).toUpperCase() + period.month.slice(1).toLowerCase()} ${period.year}`;
  const { user } = useAuth();

  return (
    <div
    onClick={()=>{
      router.push(`/complaints/${id}`)
    }}
      className="shadow-basic mb-4 cursor-pointer rounded-md py-2 px-4 md:py-4 md:px-12 flex justify-between items-center w-full"
      key={id + "k"}
    >
        <div className="flex items-center gap-x-2 md:gap-x-4">
        <img
          className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16"
          src="/icons/person.svg"
        />
        <div className="">
          <h5 className="font-bold text-sm md:text-xl md:mb-1">{ROLES[user?.role ?? 0] == "Customer" ? (report == null ? "Komplain Umum" : `Komplain Kunjungan ${report.outlet.name}`) : customerUser.name}</h5>
          <div>
            <table className="table-auto font-medium text-xs md:text-sm">
              <tbody>
                <tr>
                  {!report && <td className="pr-4">Periode: {periodString}</td>}
                  {!!report && <>
                    <td className="pr-4">Tanggal Kunjungan: {`${report.date}`}</td>
                    <td className="pr-4">Teknisi: {`${report.technician.user.name}`}</td>
                    {ROLES[user?.role ?? 0] != "Customer" && <td className="pr-4">Outlet: {`${report.outlet.name}`}</td>}
                  </>}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
