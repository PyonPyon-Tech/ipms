import { TechnicianReportsContainer } from "@components/reports/TechnicianReportsContainer";
import { AxiosClient, URL_REPORT } from "@constants/api";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { useAuth } from "@hooks/useAuth";
import { CsrReportClass } from "@models/report/CsrReport";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const ReportListPage: NextPage = () => {
  const [data, setData] = useState<CsrReportClass[]>([]);
  const { user } = useAuth();
  console.log(data);
  useEffect(() => {
    if (!user) return;
    var role = "";
    if (user.role == 0){
      role = "customer";
    } else if (user.role == 1){
      role = "manager";
    } else if (user.role == 2){
      role = "administrator";
    } else if (user.role == 3){
      role = "supervisor"
    } else {
      role = "technician"
    }
    async function loadEmployeeReports() {
      AxiosClient.get(`${URL_REPORT}/summary/2/${role}/${user?.id}`)
        .then((response) => {
          console.log(response.data);
          console.log("KKK")
          setData(response.data.map((x: any) => new CsrReportClass(x)));
        })
        .catch((err) => {
          toast.error("Error");
          console.error(err);
        });
    }
    loadEmployeeReports();
  }, [user]);

  return (
    <div className="mb-4 w-full p-8 md:p-12 md:pt-0">
      <TechnicianReportsContainer data={data} />
    </div>
  );
};
export default withAuth(withLayout(ReportListPage));
