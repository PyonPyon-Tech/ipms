import { AxiosClient, URL_SCHEDULE } from "@constants/api";
import { MyOption } from "@contexts/optionProps";
import { classNames } from "@functions/classNames";
import { useScheduleForm } from "@hooks/useScheduleForm";
import { EmployeeClass } from "@models/pestcontrol/employee";
import { OutletVisitations } from "@models/pestcontrol/outlets";
import { ScheduleForm } from "@models/pestcontrol/schedules";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { OutletVisitationCardRow } from "./OutletVisitationCardRow";

export const OutletVisitationCard: FC<{ data: OutletVisitations, 
                                        type: string,
                                        technicians?: EmployeeClass[], }> = ({
  data,
  type,
  technicians,
}) => {
  const [open, setOpen] = useState(false);
  const { changeVisitDate } = useScheduleForm();
  return (
    <div
      className="shadow-basic relative my-4 w-full cursor-pointer rounded-md p-4 md:p-5"
      onClick={() => setOpen(!open)}
    >
      <img
        src="/icons/arrow-up.svg"
        className={classNames(
          "absolute right-5 top-5 transform ",
          open ? "rotate-180" : ""
        )}
      />
      <h4 className="card-title">{data.outletName}</h4>
      <table className="my-1 text-xs md:text-sm">
        <tbody className="w-full">
          <tr>
            <td>Alamat</td>
            <td className="px-2">:</td>
            <td>{data.outletAddress}</td>
          </tr>
          <tr>
            <td>Kunjungan Terjadwal</td>
            <td className="px-2">:</td>
            <td>{`${data.visitations.filter((x) => x.date != "").length} dari ${
              data.visitations.length
            } Kunjungan`}</td>
          </tr>
        </tbody>
      </table>
      {open && (
        <div
          onClick={(e) => e.stopPropagation()}
          className={classNames("mt-4 cursor-default ")}
        >
          <h6 className="text-sm font-bold">Jadwal Kunjungan:</h6>
          <table className="my-1 table-auto text-xs">
            <tbody>
              {data.visitations.map((x, idx) => (
                <OutletVisitationCardRow
                  {...x}
                  key={"vsrow" + data.outletId + "-" + x.id}
                  changeVisitDate={changeVisitDate}
                  data={data}
                  index={idx}
                  technicians={technicians ?? []}
                  type={type}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

