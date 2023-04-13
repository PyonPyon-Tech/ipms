import { AxiosClient, URL_SCHEDULE } from "@constants/api";
import { MyOption } from "@contexts/optionProps";
import { classNames } from "@functions/classNames";
import { useScheduleForm } from "@hooks/useScheduleForm";
import { EmployeeClass } from "@models/pestcontrol/employee";
import { OutletVisitations } from "@models/pestcontrol/outlets";
import { ScheduleForm } from "@models/pestcontrol/schedules";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import Select from "react-select";
import toast from "react-hot-toast";

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
                <VisitationRow
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

const VisitationRow: FC<{
  index: number;
  id: number;
  date: string;
  data: OutletVisitations;
  type: string;
  technicians: EmployeeClass[];
  changeVisitDate: (outletId: number, index: number, date: string) => void;
}> = ({ data, date, id, index, type, technicians, changeVisitDate, }) => {
  const [dateDisabled, setDateDisabled] = useState(true);
  const [technicianDisabled, setTechnicianDisabled] = useState(true);
  const [value, setValue] = useState("");
  const [selectedTechnician, setSelectedTechnician] = useState<EmployeeClass>();

  const router = useRouter();

  useEffect(() => {
    if (!date) return;
    setValue(date);
  }, [date]);

  const updateVisitation = async (visitation: {
    id: number;
    date: string;
  }) => {
    if (!id || !date) return;
    AxiosClient.put(`${URL_SCHEDULE}/visitations`, ScheduleForm.serializeUpdateOnceForm(visitation))
      .then((response) => {
        toast.success("Berhasil diupdate");
        console.log(response.data)
      })
      .catch((err) => {
        toast.error("Ada masalah");
        console.log(err);
      });
  };

  const transferVisitation = async (visitationId: number, targetTechnician?: EmployeeClass) => {
    if (!visitationId || !targetTechnician) return;
    AxiosClient.post(`${URL_SCHEDULE}/visitations/transfer`, ScheduleForm.serializeVisitationTransferForm(visitationId, targetTechnician.id))
      .then((response) => {
        toast.success("Berhasil diupdate");
        router.push(window.location.pathname);
        console.log(response.data)
      })
      .catch((err) => {
        toast.error("Ada masalah");
        console.log(err);
      });
  };

  const selectTechnician = (t: any) => {
    setSelectedTechnician(technicians.find((technician) => technician.id == t.value) as EmployeeClass);
  };

  return (
    <tr key={data.outletId + "outlet" + index}>
      <td className="font-bold">{`Kunjungan ${index + 1} :`}</td>
      <td>
        <input
          onChange={(e) => {
            setValue(e.target.value);
          }}
          disabled={dateDisabled}
          className="outletDate"
          type="date"
          value={value}
        />
      </td>
      
      <td className="pl-4">
        {type == "technician" && <div>
          {dateDisabled ? (
            <div className="flex gap-x-3">
              <div className="py-1.5 cursor-pointer px-3 bg-blue text-white rounded-md border-2 border-blue" onClick={() => setDateDisabled(false)}>
                Edit
              </div>
              <div className="py-1.5 cursor-pointer px-3 bg-coral-dark text-white rounded-md border-2 border-coral-bg-coral-dark" onClick={() => {
                setDateDisabled(false)
                setValue("")
                changeVisitDate(data.outletId, index, "");
              }}>
                Hapus
              </div>
            </div>
          ) : (
            <div className="flex gap-x-3">
              <div className="py-1.5 cursor-pointer px-3 text-coral rounded-md border-2 border-coral" onClick={() => {
                setValue(date)
                setDateDisabled(true)
              }}>
                Batalkan
              </div>
              <div
                className="py-1.5 cursor-pointer px-3 bg-teal text-white rounded-md border-2"
                onClick={() => {
                  changeVisitDate(data.outletId, index, value);
                  setDateDisabled(true)
                }}
              >
                Simpan
              </div>
            </div>
          )}
          </div>
        }

        {type == "supervisor" && <div>
          {dateDisabled && technicianDisabled &&
            <div className="flex gap-x-3">
              <div className="py-1.5 cursor-pointer px-3 bg-blue text-white rounded-md border-2 border-coral-bg-coral-dark" onClick={() => setDateDisabled(false)}>
                Ubah Jadwal
              </div>
              <div className="py-1.5 cursor-pointer px-3 bg-orange text-white rounded-md border-2 border-coral-bg-coral-dark" onClick={() => setTechnicianDisabled(false)}>
                Ubah Teknisi
              </div>
            </div>
          }

          {!dateDisabled &&
            <div className="flex gap-x-3">
              <div className="py-1.5 cursor-pointer px-3 text-coral rounded-md border-2 border-coral" onClick={() => {
                setValue(date)
                setDateDisabled(true)
              }}>
                Batalkan
              </div>
              <div
                className="py-1.5 cursor-pointer px-3 bg-teal text-white rounded-md border-2"
                onClick={() => {
                  changeVisitDate(data.outletId, index, value);
                  setDateDisabled(true);
                  data.visitations[index].date = value;
                  updateVisitation(data.visitations[index]);
                }}
              >
                Simpan
              </div>
            </div>
          }

          {!technicianDisabled &&
            <div className="flex gap-x-3 items-baseline">
              <div className="w-48">
                <Select
                  onChange={selectTechnician}
                  options={technicians.map((technician: EmployeeClass) => {
                    return {
                      value: technician.id,
                      label: technician.user.name,
                    };
                  })}
                  components={{ Option: MyOption }}
                  styles={{
                    control: base => ({
                      ...base,
                      height: '100%',
                      minHeight: '100%'
                    })
                  }}
                />
              </div>
              <div className="py-1.5 cursor-pointer px-3 text-coral rounded-md border-2 border-coral" onClick={() => {
                setTechnicianDisabled(true)
              }}>
                Batalkan
              </div>
              <div
                className="py-1.5 cursor-pointer px-3 bg-teal text-white rounded-md border-2"
                onClick={() => {
                  let scrollY = window.scrollY;
                  transferVisitation(id, selectedTechnician);
                }}
              >
                Simpan
              </div>
            </div>
          }
        </div>
      }
    </td>
  </tr>
)};
