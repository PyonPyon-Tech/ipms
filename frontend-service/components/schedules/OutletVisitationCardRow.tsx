import { Button } from "@components/general/Button";
import { AxiosClient, URL_SCHEDULE } from "@constants/api";
import { MyOption } from "@contexts/optionProps";
import { getPeriodFromDate } from "@functions/getPeriodFromDate";
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
    status: string;
    changeVisitDate: (outletId: number, index: number, date: string) => void;
  }> = ({ data, date, id, index, type, technicians, status, changeVisitDate, }) => {
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
    <>
        <tr className="break-words" key={data.outletId + "outlet" + index}>
            <td className="font-bold w-[11%] whitespace-nowrap">{`Kunjungan ${index + 1} :`}</td>
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
            
            <td className="pl-4 w-full hidden lg:block">
              {type == "technician" && <div>
                {dateDisabled ? (
                  <div className="flex gap-x-3">
                    <Button
                      className="py-1.5 cursor-pointer px-3 bg-coral text-white rounded-md"
                      action={{
                        name: "Hapus",
                        func: () => {
                          setDateDisabled(false);
                          setValue("");
                          changeVisitDate(data.outletId, index, "");
                        },
                      }}
                    ></Button>
                    <Button
                      className="py-1.5 cursor-pointer px-3 bg-blue text-white rounded-md"
                      action={{
                        name: "Edit",
                        func: () => {
                          setDateDisabled(false);
                        },
                      }}
                    ></Button>
                  </div>
                ) : (
                  <div className="flex gap-x-3">
                    <Button
                      className="py-1.5 cursor-pointer px-3 bg-coral text-white rounded-md"
                      action={{
                        name: "Batalkan",
                        func: () => {
                          setValue(date);
                          setDateDisabled(true);
                        },
                      }}
                    ></Button>
                    <Button
                      className="py-1.5 cursor-pointer px-3 bg-teal text-white rounded-md"
                      action={{
                        name: "Simpan",
                        func: () => {
                          changeVisitDate(data.outletId, index, value);
                          setDateDisabled(true);
                        },
                      }}
                    ></Button>
                  </div>
                )}
                </div>
              }

              {type == "supervisor" && status == "Disetujui" && <div>
                {dateDisabled && technicianDisabled &&
                  <div className="flex gap-x-3">
                    <Button
                      className="py-1.5 cursor-pointer px-3 bg-blue text-white rounded-md"
                      action={{
                        name: "Ubah Jadwal",
                        func: () => {
                          setDateDisabled(false);
                        },
                      }}
                    ></Button>
                    <Button
                      className="py-1.5 cursor-pointer px-3 bg-orange text-white rounded-md"
                      action={{
                        name: "Ubah Teknisi",
                        func: () => {
                          setTechnicianDisabled(false);
                        },
                      }}
                    ></Button>
                  </div>
                }
                {!dateDisabled &&
                  <div className="flex gap-x-3">
                    <Button
                      className="py-1.5 cursor-pointer px-3 bg-coral text-white rounded-md"
                      action={{
                        name: "Batalkan",
                        func: () => {
                          setValue(date);
                          setDateDisabled(true);
                        },
                      }}
                    ></Button>
                    <Button
                      className="py-1.5 cursor-pointer px-3 bg-teal text-white rounded-md"
                      action={{
                        name: "Simpan",
                        func: () => {
                          if (getPeriodFromDate(new Date(value)) != Number(router.query.period)) {
                            return toast.error("Pergantian jadwal harus ke bulan yang sama.");
                          }
                          changeVisitDate(data.outletId, index, value);
                          setDateDisabled(true);
                          data.visitations[index].date = value;
                          updateVisitation(data.visitations[index]);
                        },
                      }}
                    ></Button>
                  </div>
                }
                {!technicianDisabled &&
                  <div className="flex gap-x-3 items-baseline">
                    <div className="w-1/2">
                      <Select
                        onChange={selectTechnician}
                        noOptionsMessage={() => {
                          toast.error("Tidak ada teknisi lain yang memiliki jadwal di bulan ini");
                          return "Tidak ada opsi";
                        }}
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
                    <Button
                      className="py-1.5 cursor-pointer px-3 bg-coral text-white rounded-md"
                      action={{
                        name: "Batalkan",
                        func: () => {
                          setTechnicianDisabled(true);
                        },
                      }}
                    ></Button>
                    <Button
                      className="py-1.5 cursor-pointer px-3 bg-teal text-white rounded-md"
                      action={{
                        name: "Simpan",
                        func: () => {
                          transferVisitation(id, selectedTechnician);
                        },
                      }}
                    ></Button>
                  </div>
                }
              </div>
              }
            </td>
        </tr>
        
        <tr className="lg:hidden h-12">
            <td className="lg:hidden"></td>
            <td className="pl-2 w-full lg:hidden">
              {type == "technician" && <div>
                {dateDisabled ? (
                  <div className="flex gap-x-3">
                    <Button
                      className="py-1.5 cursor-pointer px-3 bg-teal text-white rounded-md"
                      action={{
                        name: "Edit",
                        func: () => {
                          setDateDisabled(false);
                        },
                      }}
                    ></Button>
                    <Button
                      className="py-1.5 cursor-pointer px-3 bg-coral text-white rounded-md"
                      action={{
                        name: "Hapus",
                        func: () => {
                          setDateDisabled(false);
                          setValue("");
                          changeVisitDate(data.outletId, index, "");
                        },
                      }}
                    ></Button>
                  </div>
                ) : (
                  <div className="flex gap-x-3">
                    <Button
                      className="py-1.5 cursor-pointer px-3 bg-coral text-white rounded-md"
                      action={{
                        name: "Batalkan",
                        func: () => {
                          setValue(date);
                          setDateDisabled(true);
                        },
                      }}
                    ></Button>
                    <Button
                      className="py-1.5 cursor-pointer px-3 bg-teal text-white rounded-md"
                      action={{
                        name: "Simpan",
                        func: () => {
                          changeVisitDate(data.outletId, index, value);
                          setDateDisabled(true);
                        },
                      }}
                    ></Button>
                  </div>
                )}
                </div>
              }

              {type == "supervisor" && <div>
                {dateDisabled && technicianDisabled &&
                  <div className="flex gap-x-3">
                    <Button
                      className="py-1.5 cursor-pointer px-3 bg-blue text-white rounded-md"
                      action={{
                        name: "Ubah Jadwal",
                        func: () => {
                          setDateDisabled(false);
                        },
                      }}
                    ></Button>
                    <Button
                      className="py-1.5 cursor-pointer px-3 bg-orange text-white rounded-md"
                      action={{
                        name: "Ubah Teknisi",
                        func: () => {
                          setTechnicianDisabled(false);
                        },
                      }}
                    ></Button>
                  </div>
                }
                {!dateDisabled &&
                  <div className="flex gap-x-3">
                    <Button
                      className="py-1.5 cursor-pointer px-3 bg-coral text-white rounded-md"
                      action={{
                        name: "Batalkan",
                        func: () => {
                          setValue(date);
                          setDateDisabled(true);
                        },
                      }}
                    ></Button>
                    <Button
                      className="py-1.5 cursor-pointer px-3 bg-teal text-white rounded-md"
                      action={{
                        name: "Simpan",
                        func: () => {
                          if (getPeriodFromDate(new Date(value)) != Number(router.query.period)) {
                            return toast.error("Pergantian jadwal harus ke bulan yang sama.");
                          }
                          changeVisitDate(data.outletId, index, value);
                          setDateDisabled(true);
                          data.visitations[index].date = value;
                          updateVisitation(data.visitations[index]);
                        },
                      }}
                    ></Button>
                  </div>
                }
                {!technicianDisabled &&
                  <div className="flex gap-x-3 items-baseline">
                    <div className="w-1/2">
                      <Select
                        onChange={selectTechnician}
                        noOptionsMessage={() => {
                          toast.error("Tidak ada teknisi lain yang memiliki jadwal di bulan ini");
                          return "Tidak ada opsi";
                        }}
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
                    <Button
                      className="py-1.5 cursor-pointer px-3 bg-coral text-white rounded-md"
                      action={{
                        name: "Batalkan",
                        func: () => {
                          setTechnicianDisabled(true);
                        },
                      }}
                    ></Button>
                    <Button
                      className="py-1.5 cursor-pointer px-3 bg-teal text-white rounded-md"
                      action={{
                        name: "Simpan",
                        func: () => {
                          transferVisitation(id, selectedTechnician);
                        },
                      }}
                    ></Button>
                  </div>
                }
              </div>
              }
            </td>
        </tr>
    </>
  )};