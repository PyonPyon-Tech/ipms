import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { NextPage } from "next";

const AdminDetail : NextPage = ()=>{
    return <div>Admin Detail</div>
}
export default withAuth(withLayout(AdminDetail))