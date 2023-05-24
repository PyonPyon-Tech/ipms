import { Tag } from "@components/general/Tag";
import { Outlet } from "@models/customer/outlet";
import { Schedule } from "@models/pestcontrol/schedules";
import { useRouter } from "next/router";
import { FC } from "react";

export const ScheduleCard: FC<Schedule> = ({
  id,
  period: { id: periodId, month, year},
  technician: { id: technicianId, user: { name: technicianName } },
  supervisor: { id: supervisorId },
  comment,
  isApproved,
}) => {
  const router = useRouter()
  return (
    <div
    onClick={()=>{
      router.push(`/schedules/${technicianId}/${periodId}`)
    }}
      className="shadow-basic mb-4 cursor-pointer rounded-md py-2 px-4 md:py-4 md:px-12 flex justify-between items-center w-full"
    >
        <div className="flex items-center gap-x-2 md:gap-x-4">
        <img
          className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16"
          src="/icons/person.svg"
        />
        <div className="">
          <h5 className="font-bold text-sm md:text-xl md:mb-1 capitalize">{month.toLowerCase()} {year}</h5>
          <div>
            <table className="table-auto font-medium text-xs md:text-sm">
              <tbody>
                <tr>
                  <td className="pr-4">Teknisi: {technicianName}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Tag title={isApproved ? "Disetujui" : !!comment ? "Ditolak" : "Diajukan"} 
           className={isApproved ? "bg-teal" : !!comment ? "bg-coral" : "bg-blue"}></Tag>
    </div>
  );
};
