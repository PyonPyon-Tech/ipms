import { AxiosClient, URL_EMPLOYEE, URL_SCHEDULES } from "@constants/api";
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
}>({
  data: null,
  visitations: [],
  changeVisitDate: (x, y, z) => {},
  checkVisitDate: () => false,
  submit: async () => {},
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
    if (!data.id) {
      AxiosClient.post(
        `${URL_SCHEDULES}/period/${period}`,
        ScheduleForm.serializeCreateForm(visitations)
      )
        .then((response) => {
          console.log(response.data);
          sessionStorage.removeItem("schedule");
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      AxiosClient.put(
        `${URL_SCHEDULES}/visitations`,
        ScheduleForm.serializeUpdateForm(visitations)
      )
        .then((response) => {
          console.log(response.data);
          sessionStorage.removeItem("schedule");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const router = useRouter();

  useEffect(() => {
    if (!user || !router?.query?.period) return;
    async function loadScheduleByPeriod(periodId: number) {
      try {
        const results = await Promise.all([
          AxiosClient.get(`${URL_EMPLOYEE}/technicians/schedules/${periodId}`),
          AxiosClient.get(`${URL_EMPLOYEE}/technicians/outlets`),
        ]);
        let scheduleForm;
        if (!!results[0].data.id) {
          // if id exists, It's update and we must set schedule
          scheduleForm = ScheduleForm.buildUpdateForm(results[0].data);
        } else {
          scheduleForm = ScheduleForm.buildCreateForm(results[1].data);
        }
        setData(scheduleForm);
        setVisitations(scheduleForm.visitations);
        console.log(scheduleForm);
      } catch (error) {
        toast.error("Ada Error, Cek console");
        console.error(error);
      }
    }
    const savedSchedule = sessionStorage.getItem("schedule");
    if (!savedSchedule) {
      loadScheduleByPeriod(Number(router.query.period));
    } else {
      console.log("Load ScheduleForm from session storage");
      const schedule = JSON.parse(savedSchedule) as ScheduleForm;
      setData(schedule);
      setVisitations(schedule.visitations);
    }
  }, [user, router]);

  return (
    <ScheduleContext.Provider
      value={{ data, visitations, changeVisitDate, checkVisitDate, submit }}
    >
      {children}
    </ScheduleContext.Provider>
  );
};
