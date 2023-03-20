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

const CreateSchedule: FC = () => {
  // Get their schedule, if they exist then show the schedule.
  // If they don't, create a new schedule
  const { user } = useAuth();
  const router = useRouter();
  const { data, visitations, checkVisitDate, submit } = useScheduleForm();
  return (
    <div className="w-full p-8 md:p-12 md:pt-0">
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
