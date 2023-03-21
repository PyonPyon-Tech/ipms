import { classNames } from "@functions/classNames";
import { useScheduleForm } from "@hooks/useScheduleForm";
import { OutletVisitations } from "@models/pestcontrol/outlets";
import { FC, useState } from "react";

export const OutletVisitationCard: FC<{ data: OutletVisitations }> = ({
  data,
}) => {
  const [open, setOpen] = useState(false);
  const { changeVisitDate } = useScheduleForm();
  return (
    <div
      style={{ boxShadow: "0px 0px 5px #C5C5C5" }}
      className="relative my-4 w-full cursor-pointer rounded-[20px] p-4 md:p-5"
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
      <table className="my-1 table-auto text-xs md:text-sm">
        <tbody>
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
              {data.visitations.map((x, idx) => {
                return (
                  <tr key={data.outletId+"outlet"+idx} >
                    <td className="font-bold">{`Kunjungan ${idx+1} :`}</td>
                    <td>
                      <input
                        onChange={e=>{
                          changeVisitDate(data.outletId, idx, e.target.value)
                        }}
                        className="outletDate"
                        type="date"
                        defaultValue={x.date ?? ""}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
