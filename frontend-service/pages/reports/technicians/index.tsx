import { TechnicianReportsContainer } from "@components/reports/TechnicianReportsContainer";
import { AxiosClient, URL_EMPLOYEE } from "@constants/api";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { useAuth } from "@hooks/useAuth";
import {
  TechnicianOutlets,
  TechnicianOutletsClass,
} from "@models/pestcontrol/employee/technician";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const ReportListPage: NextPage = () => {
  const [data, setData] = useState<TechnicianOutlets[]>([]);
  const { user } = useAuth();
  console.log(data);
  useEffect(() => {
    if (!user) return;
    async function loadTechnicianOutlets() {
      AxiosClient.get(`${URL_EMPLOYEE}/supervisors/technicians`)
        .then((response) => {
          console.log(response.data);
          console.log("KKK")
          setData(response.data.map((x: any) => new TechnicianOutletsClass(x)));
        })
        .catch((err) => {
          toast.error("Error");
          console.error(err);
        });
    }
    loadTechnicianOutlets();
  }, [user]);

  return (
    <div className="mb-4 w-full p-8 md:p-12 md:pt-0">
      <TechnicianReportsContainer data={data} />
    </div>
  );
};
export default withAuth(withLayout(ReportListPage));
