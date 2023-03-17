import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { NextPage } from "next";

const TechnicianDetail : NextPage = ()=>{
    return <div>Tech Detail</div>
}
export default withAuth(withLayout(TechnicianDetail))