import { Employee } from "@models/pestcontrol/employee";
import { FC } from "react";
import { EmployeeCard } from "./employeeCard";

export const EmployeeContainer: FC<{data:Employee[]}> = ({data})=>{
    return <div className="w-full">
        {data.map(employee=> <EmployeeCard {...employee} key={employee.user.username} />)}
    </div>
}