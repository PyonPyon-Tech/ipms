import { Outlet } from "@models/customer/customer/outlet";
import { FC } from "react";
import { OutletCard } from "./outletCard";

export const OutletContainer: FC<{data: Outlet[]}> = ({data})=>{
    return <div className="w-full">
        {data.map(outlet => <OutletCard {...outlet} key={outlet.id} />)}
    </div>
}