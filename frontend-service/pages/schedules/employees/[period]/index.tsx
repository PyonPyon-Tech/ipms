import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { NextPage } from "next";

 const CreateSchedule: NextPage = ()=>{
    return <div>Hai</div>
}

export default withAuth(withLayout(CreateSchedule))