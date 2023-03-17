import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { NextPage } from "next";

const SupervisorDetail : NextPage = ()=>{
    return <div>Supervisor Detail</div>
}
export default withAuth(withLayout(SupervisorDetail))