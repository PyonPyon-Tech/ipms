import { AxiosClient, URL_EMPLOYEE, URL_SCHEDULE } from "@constants/api";
import { useAuth } from "@hooks/useAuth";
import { OutletVisitations } from "@models/pestcontrol/outlets";
import { ScheduleForm } from "@models/pestcontrol/schedules";
import { useRouter } from "next/router";
import { createContext, FC, useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const ScheduleContext = createContext<{
  data: ScheduleForm | null;
  visitations: OutletVisitations[];
  changeVisitDate: (outletId: number, index: number, date: string) => void;
  checkVisitDate: () => boolean;
  submit: () => Promise<void>;
  approveSchedule: (technicianId: number, periodId: number, comment: string, isApproved: number) => Promise<void>;
}>({
  data: null,
  visitations: [],
  changeVisitDate: (x, y, z) => {},
  checkVisitDate: () => false,
  submit: async () => {},
  approveSchedule: async(a, b, c, d) => {},
});

export const ScheduleProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<ScheduleForm | null>(null); // Data will not be changed, only for reading
  const [visitations, setVisitations] = useState<OutletVisitations[]>([]);
  const { user } = useAuth();
  const changeVisitDate = useCallback(
    (outletId: number, index: number, date: string) => {
      const updatedVisitation = visitations.map((outletVisitations) => {
        if (outletVisitations.outletId != outletId) {
          return outletVisitations;
        }
        const newVisitations = outletVisitations.visitations.map((x, idx) => {
          if (idx != index) return x;
          return {
            ...x,
            date: date,
          };
        });
        return {
          ...outletVisitations,
          visitations: newVisitations,
        };
      });
      setVisitations(updatedVisitation);
    },
    [visitations]
  );

  const checkVisitDate = () => {
    let mustBeFilled, visitSameDay;
    visitations.forEach((v) => {
      const setOfVisitationDate = new Set(v.visitations.map((x) => x.date));
      if (Array.from(setOfVisitationDate).length != v.visitations.length) {
        visitSameDay = true;
      }
      if (v.visitations.filter((x) => x.date == "").length != 0) {
        mustBeFilled = true;
      }
    });
    if (mustBeFilled) {
      toast.error("Semua Kunjungan Harus Diisi", {
        duration: 4000,
      });
    }
    if (visitSameDay) {
      toast.error("Kunjungan suatu outlet harus di hari yang berbeda", {
        duration: 4000,
      });
    }
    return !mustBeFilled && !visitSameDay;
  };

  const submit = async () => {
    const period = router?.query?.period;
    if (!data || !visitations || !period) return;
    sessionStorage.setItem("schedule", JSON.stringify(data)); // Biar datanya nggak ilang. Hapus kalau sudah sukses disimpan
    toast.loading("Mohon tunggu...")
    if (!data.id) {
      AxiosClient.post(
        `${URL_SCHEDULE}/period/${period}`,
        ScheduleForm.serializeCreateForm(visitations)
      )
        .then((response) => {
          toast.dismiss()
          console.log(response.data);
          sessionStorage.removeItem("schedule");
          toast.success("Berhasil mengajukan schedule")
        })
        .catch((err) => {
          toast.dismiss()
          toast.error("Terjadi Masalah")
          console.error(err);
        });
    } else {
      AxiosClient.put(
        `${URL_SCHEDULE}/visitations`,
        ScheduleForm.serializeUpdateForm(visitations)
      )
        .then((response) => {
          toast.dismiss()
          console.log(response.data);
          sessionStorage.removeItem("schedule");
          toast.success("Berhasil Memperbarui Schedule")
        })
        .catch((err) => {
          toast.dismiss()
          toast.error("Terjadi Masalah")
          console.error(err);
        });
    }
  };

  const approveSchedule = async (technicianId: number, periodId: number, comment: string, isApproved: number) => {
    const period = router?.query?.period;
    if (!periodId || !comment) return;
    
    toast.loading("Mohon tunggu...")
    AxiosClient.post(
      `${URL_SCHEDULE}/technicians/${technicianId}/period/${period}`, {
        comment: comment,
        isApproved: isApproved
      }
    )
    .then((response) => {
      toast.dismiss()
      console.log(response.data);
      sessionStorage.removeItem("schedule");
      toast.success("Berhasil Memperbarui Schedule")
    })
    .catch((err) => {
      toast.dismiss()
      toast.error("Terjadi Masalah")
      console.error(err);
    });
  };

  const router = useRouter();

  useEffect(() => {
    if (!user || (!router?.query?.period)) return;
    async function loadScheduleByPeriod(periodId: number, isSupervisor: boolean) {
      const t = toast.loading("Mengambil data...")
      try {
        console.log(`isSupervisor ${isSupervisor}`);
        const results = !isSupervisor ? await Promise.all([
          AxiosClient.get(`${URL_EMPLOYEE}/technicians/schedules/${periodId}`),
          AxiosClient.get(`${URL_EMPLOYEE}/technicians/outlets`),
        ]) : await Promise.all([
          AxiosClient.get(`${URL_EMPLOYEE}/technicians/${router.query.technician}/schedules/${router.query.period}`),
          { data: ''}
        ]);
        let scheduleForm;
        if (isSupervisor) {
          scheduleForm = ScheduleForm.buildUpdateForm(results[0].data);
        } else if(!!results[0].data.id) {
          scheduleForm = ScheduleForm.buildUpdateForm(results[0].data);
        }else{
          scheduleForm = ScheduleForm.buildCreateForm(results[1].data);
        }
        setData(scheduleForm);
        setVisitations(scheduleForm.visitations);
        console.log(scheduleForm);
        toast.dismiss(t)
      } catch (error) {
        toast.error("Ada Error, Cek console");
        console.error(error);
        toast.dismiss(t)
      }
    }
    const savedSchedule = sessionStorage.getItem("schedule");
    if (!savedSchedule) {
      loadScheduleByPeriod(Number(router.query.period), !!router?.query?.technician);
    } else {
      console.log("Load ScheduleForm from session storage");
      const schedule = JSON.parse(savedSchedule) as ScheduleForm;
      setData(schedule);
      setVisitations(schedule.visitations);
    }
  }, [user, router]);

  return (
    <ScheduleContext.Provider
      value={{ data, visitations, changeVisitDate, checkVisitDate, submit, approveSchedule }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};
