import { ComplaintContainer } from "@components/complaints/ComplaintList";
import { CustomerDashboard } from "@components/dashboard/customerDashboard";
import { Title } from "@components/general/Title";
import { AxiosClient, URL_DASHBOARD } from "@constants/api";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { useAuth } from "@hooks/useAuth";
import { ComplaintData } from "@models/dashboard/customer/complaint";
import { MonthlyVisitationData } from "@models/dashboard/customer/monthlyVisitation";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { ROLES } from "@constants/roles";
import { CsrReport, CsrReportClass } from "@models/report/CsrReport";

const Home: NextPage = () => {
  const { user } = useAuth();
  const [customerMonthlyVisitationData, setCustomerMonthlyVisitationData] = useState<MonthlyVisitationData>({ completedVisitations: 0, totalVisitations: 0 });
  const [customerComplaintData, setCustomerComplaintData] = useState<ComplaintData>({ acknowledgedComplaints: 0, totalComplaints: 0 });
  const [customerRecentReportsData, setCustomerRecentReportsData] = useState<CsrReport[]>([]);

  useEffect(() => {
    if (!user) return;

    async function retrieveCustomerDashboardData() {
      const customerMonthlyVisitationsResult = await AxiosClient.get(`${URL_DASHBOARD}/customers/visitations`);
      setCustomerMonthlyVisitationData(customerMonthlyVisitationsResult.data);

      const customerComplaintsResult = await AxiosClient.get(`${URL_DASHBOARD}/customers/complaints`);
      setCustomerComplaintData(customerComplaintsResult.data);

      const customerRecentReportsResult = await AxiosClient.get(`${URL_DASHBOARD}/customers/recent-reports`);
      let reportArr = [];
      for (let report of customerRecentReportsResult.data) {
        reportArr.push(new CsrReportClass(report));
      }

      setCustomerRecentReportsData(reportArr);
    }
    async function retrieveEmployeeDashboardData() {
      const customerMonthlyVisitationsResult = await AxiosClient.get(`${URL_DASHBOARD}/employee/visitations`);
      setCustomerMonthlyVisitationData(customerMonthlyVisitationsResult.data);

      const customerComplaintsResult = await AxiosClient.get(`${URL_DASHBOARD}/employee/complaints`);
      setCustomerComplaintData(customerComplaintsResult.data);

      const customerRecentReportsResult = await AxiosClient.get(`${URL_DASHBOARD}/employee/recent-reports`);
      let reportArr = [];
      for (let report of customerRecentReportsResult.data) {
        reportArr.push(new CsrReportClass(report));
      }

      setCustomerRecentReportsData(reportArr);
    }

    if (ROLES[user?.role ?? 0] == "Customer") {
      retrieveCustomerDashboardData();
    }else{
      retrieveEmployeeDashboardData()
    }
  }, [user]);
  
  return (
    <div className="mb-10">
      <Title title="Dashboard"></Title>
      {ROLES[user?.role ?? 0] == "Customer" && <CustomerDashboard 
        monthlyVisitationData={customerMonthlyVisitationData} 
        complaintData={customerComplaintData}
        recentReportsData={customerRecentReportsData}
      />}
      {ROLES[user?.role ?? 0] != "Customer" && <CustomerDashboard 
        monthlyVisitationData={customerMonthlyVisitationData} 
        complaintData={customerComplaintData}
        recentReportsData={customerRecentReportsData}
      />}
    </div>
  );
};
export default withAuth(withLayout(Home));
