import { Container } from "@components/general/Container";
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

const statusmap ={
  Disetujui: "bg-teal-dark",
  Ditolak: "bg-coral-dark",
  "Sedang Diajukan": "bg-blue",
  "Belum Diajukan": "bg-orange"
}

const CreateSchedule: FC = () => {
  // Get their schedule, if they exist then show the schedule.
  // If they don't, create a new schedule
  const { user } = useAuth();
  const router = useRouter();
  const { data, visitations, checkVisitDate, submit } = useScheduleForm();
  const status = data?.isApproved == 1 ? "Disetujui" :  (data?.id && data?.comment) ? "Ditolak" : (data?.id) ? "Sedang Diajukan": "Belum Diajukan"

  return (
    <div className="relative w-full p-8 md:p-12 md:pt-0">
      <div className="mb-4 font-bold">
        <div className="flex justify-between gap-x-4">
          <h2 className="text-xl md:text-3xl">Kelola Jadwal</h2>
          <div
            onClick={() => {
              if (checkVisitDate()) {
                submit();
              }
            }}
            className="cursor-pointer rounded-lg bg-blue py-1 px-2 text-xs font-medium text-white md:py-2 md:px-3 md:text-sm"
          >
            Submit
          </div>
        </div>
      </div>
      <Container className="w-full mb-6 md:mb-8 rounded-xl overflow-x-auto overflow-y-hidden">
        <div className="w-full">
          <div className="w-full flex mb-2 md:mb-4" >
            <div className="bg-orange bg-blue bg-coral-dark bg-teal-dark" ></div>
            <div className={`${statusmap[status] ?? "bg-blue"} text-white text-sm p-1 font-medium rounded-md`}>{status}</div>
          </div>
          {visitations.length > 0 && <ScheduleCalendar data={visitations} />}
          <div className="my-4 md:my-6">
            <h4 className="card-title">Pesan Supervisor:</h4>
            <p>
              <textarea
                disabled
                className="appearance-none bg-zinc-100"
                value={data?.comment ?? "-"}
              ></textarea>
            </p>
          </div>
        </div>
      </Container>
      {visitations.length > 0 && (
        <OutletVisitationContainer data={visitations} />
      )}
    </div>
  );
};

const CreateSchedulePage: NextPage = () => {
  return (
    <ScheduleProvider>
      <CreateSchedule />
    </ScheduleProvider>
  );
};

// Create outlet cards
// Use one state to record all

export default withAuth(withLayout(CreateSchedulePage));
