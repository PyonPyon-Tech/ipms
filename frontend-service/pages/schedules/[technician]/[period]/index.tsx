import { Button } from "@components/general/Button";
import { Container } from "@components/general/Container";
import { Tag } from "@components/general/Tag";
import { ScheduleCalendar } from "@components/schedules/Calender";
import { OutletVisitationContainer } from "@components/schedules/OutletVisitationContainer";
import { AxiosClient, URL_EMPLOYEE } from "@constants/api";
import { ScheduleProvider } from "@contexts/schedule";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { useAuth } from "@hooks/useAuth";
import { useScheduleForm } from "@hooks/useScheduleForm";
import { ScheduleForm } from "@models/pestcontrol/schedules";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const statusmap = {
  Disetujui: "bg-teal-dark",
  Ditolak: "bg-coral-dark",
  "Sedang Diajukan": "bg-blue",
  "Belum Diajukan": "bg-orange",
};

const ApproveSchedule: FC = () => {
  // Get their schedule, if they exist then show the schedule.
  // If they don't, create a new schedule
  const { user } = useAuth();
  const router = useRouter();
  const { data, visitations, checkVisitDate, approveSchedule } =
    useScheduleForm();
  const [comment, setComment] = useState("");

  const status =
    data?.isApproved == 1
      ? "Disetujui"
      : data?.id && data?.comment
      ? "Ditolak"
      : data?.id
      ? "Sedang Diajukan"
      : "Belum Diajukan";

  const technicianId = Number(router.query.technician),
    periodId = Number(router.query.period);

  useEffect(() => {
    setComment(data?.comment ?? "");
  }, [data]);

  return (
    <div className="relative w-full">
      <div className="mb-4 font-bold">
        <div className="flex justify-between gap-x-4">
          <h2 className="text-xl md:text-3xl">Kelola Jadwal</h2>
          <div className="flex justify-between gap-x-4">
          {data?.id &&
            <>
              <Button
                className={statusmap["Ditolak"]}
                action={{
                    name: `Tolak`,
                    func: () => {
                      approveSchedule(technicianId, periodId, comment, 0).then(() => {
                        setTimeout(() => {
                          router.push(window.location.pathname);
                        }, 50)
                      });
                    }
                }}
              ></Button>
              <Button
                className={statusmap["Disetujui"]}
                action={{
                    name: `Setujui`,
                    func: () => {
                      approveSchedule(technicianId, periodId, comment, 1).then(() => {
                        setTimeout(() => {
                          router.push(window.location.pathname);
                        }, 50)
                      });
                    }
                }}
              ></Button>
            </>}
          </div>
        </div>
      </div>
      <Container className="mb-6 w-full overflow-x-auto overflow-y-hidden rounded-xl md:mb-8">
        <div className="w-full">
          <div className="w-full flex mb-2 md:mb-4" >
            <Tag title={status} className={statusmap[status] ?? "bg-blue"}></Tag>
          </div>
          <ScheduleCalendar data={visitations} />
          <div className="my-4 md:my-6">
            <h4 className="card-title">Pesan Supervisor:</h4>
            <p>
              {!!comment && (
                <textarea
                  className="appearance-none bg-zinc-100"
                  value={comment}
                  onChange={(event) => setComment(event.target.value)}
                ></textarea>
              )}
              {!comment && (
                <textarea
                  className="appearance-none bg-zinc-100"
                  placeholder={!!data?.id ? "Pesan Anda" : "-"}
                  disabled={!data?.id}
                  onChange={(event) => setComment(event.target.value)}
                ></textarea>
              )}
            </p>
          </div>
        </div>
      </Container>
      {visitations.length > 0 && (
        <OutletVisitationContainer
          data={visitations}
          type="supervisor"
          technicianId={technicianId}
        />
      )}
    </div>
  );
};

const ApproveSchedulePage: NextPage = () => {
  return (
    <ScheduleProvider>
      <ApproveSchedule />
    </ScheduleProvider>
  );
};

export default withAuth(withLayout(ApproveSchedulePage));
