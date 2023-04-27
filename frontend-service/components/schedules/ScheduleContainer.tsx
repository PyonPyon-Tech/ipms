import { Outlet } from "@models/customer/outlet";
import { Schedule } from "@models/pestcontrol/schedules";
import { FC } from "react";
import { ScheduleCard } from "./ScheduleCard";

export const ScheduleContainer: FC<{data: Schedule[], pathname: string}> = ({data, pathname})=>{
    return <div className="w-full">
        {data.map(schedule => <ScheduleCard {...schedule} key={pathname + schedule.id} />)}
    </div>
}