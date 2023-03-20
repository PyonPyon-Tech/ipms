import { Customer } from "@models/customer/customer";
import { FC } from "react";
import { CustomerCard } from "./customerCard";

export const CustomerContainer: FC<{data: Customer[]}> = ({data})=>{
    return <div className="w-full">
        {data.map(customer => <CustomerCard {...customer} key={customer.user.username} />)}
    </div>
}