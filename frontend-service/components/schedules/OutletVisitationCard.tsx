import { classNames } from "@functions/classNames";
import { useScheduleForm } from "@hooks/useScheduleForm";
import { OutletVisitations } from "@models/pestcontrol/outlets";
import { FC, useEffect, useState } from "react";

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
              {data.visitations.map((x, idx) => (
                <VisitationRow
                  {...x}
                  key={"vsrow" + data.outletId + "-" + x.id}
                  changeVisitDate={changeVisitDate}
                  data={data}
                  index={idx}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

const VisitationRow: FC<{
  index: number;
  id: number;
  date: string;
  data: OutletVisitations;
  changeVisitDate: (outletId: number, index: number, date: string) => void;
}> = ({ data, date, id, index, changeVisitDate }) => {
  const [disabled, setDisabled] = useState(true);
  const [value, setValue] = useState("");
  useEffect(() => {
    if (!date) return;
    setValue(date);
  }, [date]);
  return (
    <tr key={data.outletId + "outlet" + index}>
      <td className="font-bold">{`Kunjungan ${index + 1} :`}</td>
      <td>
        <input
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={disabled}
          className="outletDate"
          type="date"
          value={value}
        />
      </td>
      <td className="pl-4">
        {disabled ? (
          <div className="flex">
            <div className="py-1.5 cursor-pointer px-3 bg-blue text-white rounded-md border-2 border-blue" onClick={() => setDisabled(false)}>
              Edit
            </div>
          </div>
        ) : (
          <div className="flex gap-x-4">
            <div className="py-1.5 cursor-pointer px-3 text-coral rounded-md border-2 border-coral" onClick={() => {
              setValue(date)
              setDisabled(true)
            }}>
              Batalkan
            </div>
            <div
              className="py-1.5 cursor-pointer px-3 bg-teal text-white rounded-md border-2"
              onClick={() => {
                changeVisitDate(data.outletId, index, value);
              }}
            >
              Simpan
            </div>
          </div>
        )}
      </td>
    </tr>
  );
};
