import { Button } from "@components/general/Button";
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
}> = ({ data, date, id, index, type, technicians, changeVisitDate }) => {
  const [dateDisabled, setDateDisabled] = useState(true);
  const [technicianDisabled, setTechnicianDisabled] = useState(true);
  const [value, setValue] = useState("");
  const [selectedTechnician, setSelectedTechnician] = useState<EmployeeClass>();

  const router = useRouter();

  useEffect(() => {
    if (!date) return;
    setValue(date);
  }, [date]);

  const updateVisitation = async (visitation: { id: number; date: string }) => {
    if (!id || !date) return;
    AxiosClient.put(
      `${URL_SCHEDULE}/visitations`,
      ScheduleForm.serializeUpdateOnceForm(visitation)
    )
      .then((response) => {
        toast.success("Berhasil diupdate");
        console.log(response.data);
      })
      .catch((err) => {
        toast.error("Ada masalah");
        console.log(err);
      });
  };

  const transferVisitation = async (
    visitationId: number,
    targetTechnician?: EmployeeClass
  ) => {
    if (!visitationId || !targetTechnician) return;
    AxiosClient.post(
      `${URL_SCHEDULE}/visitations/transfer`,
      ScheduleForm.serializeVisitationTransferForm(
        visitationId,
        targetTechnician.id
      )
    )
      .then((response) => {
        toast.success("Berhasil diupdate");
        router.push(window.location.pathname);
        console.log(response.data);
      })
      .catch((err) => {
        toast.error("Ada masalah");
        console.log(err);
      });
  };

  const selectTechnician = (t: any) => {
    setSelectedTechnician(
      technicians.find(
        (technician) => technician.id == t.value
      ) as EmployeeClass
    );
  };

  return (
    <>
      <tr className="break-words" key={data.outletId + "outlet" + index}>
        <td className="w-[11%] whitespace-nowrap font-bold">{`Kunjungan ${
          index + 1
        } :`}</td>
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

        <td className="hidden w-full pl-4 lg:block">
          {type == "technician" && (
            <div>
              {dateDisabled ? (
                <div className="flex gap-x-3">
                  <Button
                    action={{
                      name: "Edit",
                      func: () => setDateDisabled(false),
                    }}
                  ></Button>
                  {/* <div
                    className="cursor-pointer rounded-md border-2 border-blue bg-blue py-1.5 px-3 text-white"
                    onClick={() => setDateDisabled(false)}
                  >
                    Edit
                  </div> */}

                  <Button
                    className="bg-coral-dark"
                    action={{
                      name: "Hapus",
                      func: () => {
                        setDateDisabled(false);
                        setValue("");
                        changeVisitDate(data.outletId, index, "");
                      },
                    }}
                  ></Button>
                  {/* <div
                    className="border-coral-bg-coral-dark cursor-pointer rounded-md border-2 bg-coral-dark py-1.5 px-3 text-white"
                    onClick={() => {
                      setDateDisabled(false);
                      setValue("");
                      changeVisitDate(data.outletId, index, "");
                    }}
                  >
                    Hapus
                  </div> */}
                </div>
              ) : (
                <div className="flex gap-x-3">
                  <div
                    className="cursor-pointer rounded-md border-2 border-coral py-1.5 px-3 text-coral"
                    onClick={() => {
                      setValue(date);
                      setDateDisabled(true);
                    }}
                  >
                    Batalkan
                  </div>
                  <div
                    className="cursor-pointer rounded-md border-2 bg-teal py-1.5 px-3 text-white"
                    onClick={() => {
                      changeVisitDate(data.outletId, index, value);
                      setDateDisabled(true);
                    }}
                  >
                    Simpan
                  </div>
                </div>
              )}
            </div>
          )}

          {type == "supervisor" && (
            <div>
              {dateDisabled && technicianDisabled && (
                <div className="flex gap-x-3">
                  <div
                    className="border-coral-bg-coral-dark cursor-pointer rounded-md border-2 bg-blue py-1.5 px-3 text-white"
                    onClick={() => setDateDisabled(false)}
                  >
                    Ubah Jadwal
                  </div>
                  <div
                    className="border-coral-bg-coral-dark cursor-pointer rounded-md border-2 bg-orange py-1.5 px-3 text-white"
                    onClick={() => setTechnicianDisabled(false)}
                  >
                    Ubah Teknisi
                  </div>
                </div>
              )}
              {!dateDisabled && (
                <div className="flex gap-x-3">
                  <div
                    className="cursor-pointer rounded-md border-2 border-coral py-1.5 px-3 text-coral"
                    onClick={() => {
                      setValue(date);
                      setDateDisabled(true);
                    }}
                  >
                    Batalkan
                  </div>
                  <div
                    className="cursor-pointer rounded-md border-2 bg-teal py-1.5 px-3 text-white"
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
              )}
              {!technicianDisabled && (
                <div className="flex items-baseline gap-x-3">
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
                        control: (base) => ({
                          ...base,
                          height: "100%",
                          minHeight: "100%",
                        }),
                      }}
                    />
                  </div>
                  <div
                    className="cursor-pointer rounded-md border-2 border-coral py-2 px-3 text-xs font-semibold text-coral hover:bg-opacity-70 md:text-base"
                    onClick={() => {}}
                  >
                    Batalkan
                  </div>
                  <div
                    className="cursor-pointer rounded-md border-2 border-teal-dark bg-teal-dark py-2 px-3 text-xs font-semibold text-white hover:bg-opacity-70 md:text-base"
                    onClick={() => {
                      changeVisitDate(data.outletId, index, value);
                      setDateDisabled(true);
                    }}
                  >
                    Simpan
                  </div>

                  <div
                    className="cursor-pointer rounded-md border-2 border-coral py-1.5 px-3 text-coral"
                    onClick={() => {
                      setTechnicianDisabled(true);
                    }}
                  >
                    Batalkan
                  </div>
                  <div
                    className="cursor-pointer rounded-md border-2 bg-teal py-1.5 px-3 text-white"
                    onClick={() => {
                      transferVisitation(id, selectedTechnician);
                    }}
                  >
                    Simpan
                  </div>
                </div>
              )}
            </div>
          )}
        </td>
      </tr>

      <tr className="h-12 lg:hidden">
        <td className="lg:hidden"></td>
        <td className="w-full pl-2 lg:hidden">
          {type == "technician" && (
            <div>
              {dateDisabled ? (
                <div className="flex gap-x-2">
                  <Button
                    className="bg-coral-dark"
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
                    action={{
                      name: "Edit",
                      func: () => setDateDisabled(false),
                    }}
                  ></Button>
                  {/* <div
                    className="cursor-pointer rounded-md border-2 border-blue bg-blue py-1.5 px-3 text-white"
                    onClick={() => setDateDisabled(false)}
                  >
                    Edit
                  </div> */}
                  {/* <div
                    className="border-coral-bg-coral-dark cursor-pointer rounded-md border-2 bg-coral-dark py-1.5 px-3 text-white"
                    onClick={() => {
                      setDateDisabled(false);
                      setValue("");
                      changeVisitDate(data.outletId, index, "");
                    }}
                  >
                    Hapus
                  </div> */}
                </div>
              ) : (
                <div className="flex gap-x-2">
                  <div
                    className="cursor-pointer rounded-md border-2 border-coral py-2 px-3 text-xs font-semibold text-coral hover:bg-opacity-70 md:text-base"
                    onClick={() => {
                      setValue(date);
                      setDateDisabled(true);
                    }}
                  >
                    Batalkan
                  </div>
                  <div
                    className="cursor-pointer rounded-md border-2 border-teal-dark bg-teal-dark py-2 px-3 text-xs font-semibold text-white hover:bg-opacity-70 md:text-base"
                    onClick={() => {
                      changeVisitDate(data.outletId, index, value);
                      setDateDisabled(true);
                    }}
                  >
                    Simpan
                  </div>
                </div>
              )}
            </div>
          )}

          {type == "supervisor" && (
            <div>
              {dateDisabled && technicianDisabled && (
                <div className="flex gap-x-3">
                  <div
                    className="border-coral-bg-coral-dark cursor-pointer rounded-md border-2 bg-blue py-1.5 px-3 text-white"
                    onClick={() => setDateDisabled(false)}
                  >
                    Ubah Jadwal
                  </div>
                  <div
                    className="border-coral-bg-coral-dark cursor-pointer rounded-md border-2 bg-orange py-1.5 px-3 text-white"
                    onClick={() => setTechnicianDisabled(false)}
                  >
                    Ubah Teknisi
                  </div>
                </div>
              )}
              {!dateDisabled && (
                <div className="flex gap-x-3">
                  <div
                    className="cursor-pointer rounded-md border-2 border-coral py-1.5 px-3 text-coral"
                    onClick={() => {
                      setValue(date);
                      setDateDisabled(true);
                    }}
                  >
                    Batalkan
                  </div>
                  <div
                    className="cursor-pointer rounded-md border-2 bg-teal py-1.5 px-3 text-white"
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
              )}
              {!technicianDisabled && (
                <div className="flex items-baseline gap-x-3">
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
                        control: (base) => ({
                          ...base,
                          height: "100%",
                          minHeight: "100%",
                        }),
                      }}
                    />
                  </div>
                  <Button
                    className="border-coral text-coral"
                    action={{
                      name: "Batalkan",
                      func: () => {
                        setTechnicianDisabled(true);
                      },
                    }}
                  ></Button>
                  <Button
                    className="bg-teal"
                    action={{
                      name: "Simpan",
                      func: () => {
                        transferVisitation(id, selectedTechnician);
                      },
                    }}
                  ></Button>
                </div>
              )}
            </div>
          )}
        </td>
      </tr>
    </>
  );
};
