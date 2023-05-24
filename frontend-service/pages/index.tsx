import { ComplaintContainer } from "@components/complaints/ComplaintList";
import { CustomerDashboard } from "@components/dashboard/customerDashboard";
import { EmployeeDashboard } from "@components/dashboard/employeeDashboard";
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
import { Pesticide, PesticideClass } from "@models/pestcontrol/Pesticide";
import { MonthlyPestTrendData, MonthlyPestTrendDataClass } from "@models/dashboard/employee/monthlyPest";

const Home: NextPage = () => {
  const { user } = useAuth();
  const [customerMonthlyVisitationData, setCustomerMonthlyVisitationData] = useState<MonthlyVisitationData>({ completedVisitations: 0, totalVisitations: 0 });
  const [customerComplaintData, setCustomerComplaintData] = useState<ComplaintData>({ acknowledgedComplaints: 0, totalComplaints: 0 });
  const [customerRecentReportsData, setCustomerRecentReportsData] = useState<CsrReport[]>([]);
  const [stockWarningData, setStockWarningData] = useState<Pesticide[]>([]);
  const [pestTrendData, setPestTrendData] = useState<MonthlyPestTrendData[]>([]);
  const [complaintTrendData, setComplaintTrendData] = useState<number[]>([]);

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

      const stockWarningResult = await AxiosClient.get(`${URL_DASHBOARD}/employee/low-stock`);
      let lowStockArr = [];
      for (let pesticide of stockWarningResult.data) {
        lowStockArr.push(new PesticideClass(pesticide));
      }
      setStockWarningData(lowStockArr);

      const pestTrendResult = await AxiosClient.get(`${URL_DASHBOARD}/employee/pest-trend`);
      let pestTrendArr = [];
      for (let pestTrend of pestTrendResult.data) {
        pestTrendArr.push(new MonthlyPestTrendDataClass(pestTrend));
      }
      setPestTrendData(pestTrendArr);

      const complaintsTrendResult = await AxiosClient.get(`${URL_DASHBOARD}/employee/complaints-trend`);
      setComplaintTrendData(complaintsTrendResult.data);
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
      {ROLES[user?.role ?? 0] != "Customer" && <EmployeeDashboard
        employeeRole={ROLES[user?.role ?? 0]}
        monthlyVisitationData={customerMonthlyVisitationData}
        complaintData={customerComplaintData}
        recentReportsData={customerRecentReportsData}
        stockWarningData={stockWarningData}
        pestTrendData={pestTrendData} 
        complaintTrendData={complaintTrendData}
        />}
    </div>
  );
};
export default withAuth(withLayout(Home));
