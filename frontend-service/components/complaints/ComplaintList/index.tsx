import { Complaint } from "@models/customer/complaint";
import { FC } from "react";
import { ComplaintCard } from "./complaintCard";

export const ComplaintContainer: FC<{data: Complaint[]}> = ({data})=>{
    return <div className="w-full">
        {data.map(complaint => <ComplaintCard {...complaint} key={complaint.id} />)}
    </div>
}