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
    async function loadTechnicianReports() {
      AxiosClient.get(`${URL_REPORT}/summary/2/employee/${user?.id}`)
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
    loadTechnicianReports();
  }, [user]);

  return (
    <div className="mb-4 w-full p-8 md:p-12 md:pt-0">
      <TechnicianReportsContainer data={data} />
    </div>
  );
};
export default withAuth(withLayout(ReportListPage));
