import { AxiosClient, URL_SCHEDULE } from "@constants/api";
import { MyOption } from "@contexts/optionProps";
import { EmployeeClass } from "@models/pestcontrol/employee";
import { OutletVisitations } from "@models/pestcontrol/outlets";
import { ScheduleForm } from "@models/pestcontrol/schedules";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import Select from "react-select";

export const OutletVisitationCardRow: FC<{
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
      <tr className="break-words" key={data.outletId + "outlet" + index}>
        <td className="font-bold w-[11%]">{`Kunjungan ${index + 1} :`}</td>
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
        
        <td className="pl-4 w-full">
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
                <div className="w-1/2">
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