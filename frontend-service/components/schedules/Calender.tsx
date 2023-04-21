import { FC, useCallback, useEffect, useState } from "react";
import React from "react";
import { render } from "react-dom";
// import events from "./events";
import moment from "moment";
import "moment/locale/id";
import "react-big-calendar/lib/css/react-big-calendar.css";
import {
  Calendar,
  Event,
  EventWrapperProps,
  momentLocalizer,
  ToolbarProps,
  Views,
} from "react-big-calendar";
import { OutletVisitations } from "@models/pestcontrol/outlets";
import { toast } from "react-hot-toast";
import {
  getDateFromPeriod,
  getPeriodFromDate,
} from "@functions/getPeriodFromDate";
import { useRouter } from "next/router";
import { useScheduleForm } from "@hooks/useScheduleForm";

// BigCalendar.momentLocalizer(moment);
// const allViews = Object.keys(BigCalendar.Views).map(k => BigCalendar.Views[k]);
moment.locale("id");
const localizer = momentLocalizer(moment);

export const ScheduleCalendar: FC<{ data: OutletVisitations[] }> = ({
  data,
}) => {
  const router = useRouter();
  const events: Event[] = outletVisitationsToEvent(data);
  const [date, setDate] = useState<Date>();
  
  useEffect(() => {
    if (data.length == 0) return;
    const events: Event[] = outletVisitationsToEvent(data);
    console.log("blabla");
    console.log(events);
    if (events.length > 0) {
      console.log(`A`);
      setDate(events[0]?.start);
    } else if (events.length == 0) {
      if (!router.query.period) return;
      console.log(`B`);
      console.log(getDateFromPeriod(Number(router.query.period)));
      setDate(getDateFromPeriod(Number(router.query.period)));
    }
  }, [data, router]);

  const onNavigate = useCallback(
    (newDate: any) => {
      if (!router.query) return;
      const period = getPeriodFromDate(newDate);
      const currentPeriod = router?.query.period;
      const technicianId = router?.query.technician;
      let newRoute: string;

      if(!!technicianId) {
        newRoute = `/schedules/${technicianId}/`;
      } else {
        newRoute = "/schedules/propose/";
      }

      if (period != Number(currentPeriod)) {
        setDate(newDate);
        router.replace(newRoute + period);
      } else {
        setDate(newDate);
      }
    },
    [setDate, router]
  );

  return (
    <div className="flex w-full min-w-[500px] flex-row-reverse overflow-x-auto overflow-y-hidden ">
      <Calendar
        localizer={localizer}
        events={events}
        style={{ height: 600, width: "100%" }}
        startAccessor="start"
        endAccessor="end"
        views={[Views.MONTH, Views.AGENDA]}
        popup={true}
        date={date}
        onNavigate={onNavigate}
        onDoubleClickEvent={(e: Event) => {
          toast.custom((t) => <CustomToast e={e} t={t} />, {
            duration: 3000,
          });
        }}
      ></Calendar>
    </div>
  );
};

const outletVisitationsToEvent = (data: OutletVisitations[]): Event[] => {
  const result: Event[] = [];
  data.forEach((outlet) => {
    outlet.visitations.forEach((v) => {
      if (!!v?.date) {
        const start = moment(v?.date, "YYYY-MM-DD");
        result.push({
          title: outlet.outletName,
          start: start.toDate(),
          end: start.add(1, "day").toDate(),
          allDay: true,
          resource: outlet.outletAddress,
        });
      }
    });
  });
  return result;
};

const CustomToast: FC<{ e: Event; t: any }> = ({ e, t }) => (
  <div
    className={`${
      t.visible ? "animate-enter" : "animate-leave"
    } pointer-events-auto flex w-full max-w-md rounded-md bg-blue-dark text-white shadow-lg ring-1 ring-black ring-opacity-5`}
  >
    <div className="w-0 flex-1 p-4">
      <div className="flex items-start">
        <div className="flex-shrink-0 pt-0.5"></div>
        <div className="ml-3 flex-1">
          <p className="text-lg font-bold">{e.title}</p>
          <p className="mt-1">{e.resource}</p>
        </div>
      </div>
    </div>
    <div className="flex border-l border-gray-200">
      <button
        onClick={() => toast.dismiss(t.id)}
        className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-white"
      >
        Tutup
      </button>
    </div>
  </div>
);
