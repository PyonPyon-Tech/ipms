import { MonthlyVisitationData } from "@models/dashboard/employee/monthlyVisitation";
import { Chart, ArcElement, Tooltip, Title, Legend } from 'chart.js';
import { ComplaintData } from "@models/dashboard/employee/complaint";
import { CsrReport } from "@models/report/CsrReport";
import { Pesticide } from "@models/pestcontrol/Pesticide";
import { VisitationRingChart } from "@components/dashboard/module/visitationRingChart";
import { ComplaintRingChart } from "./module/complaintRingChart";
import { StockWarningTable } from "./module/stockWarningTable";
import { RecentReportTable } from "./module/recentReportTable";

Chart.register(ArcElement, Tooltip, Title, Legend);

export const EmployeeDashboard = ({
  employeeRole,
  monthlyVisitationData,
  complaintData,
  recentReportsData,
  stockWarningData,
}: {  
  employeeRole: String,
  monthlyVisitationData: MonthlyVisitationData, 
  complaintData: ComplaintData,
  recentReportsData: CsrReport[],
  stockWarningData: Pesticide[],
}) => {
  return (
    <>
      <div className="flex flex-wrap">
        <VisitationRingChart monthlyVisitationData={monthlyVisitationData}/>
        <ComplaintRingChart complaintData={complaintData}/>
      </div>

      {(employeeRole == "Administrator" || employeeRole == "Manajer") && 
        <StockWarningTable stockWarningData={stockWarningData}/>
      }

      <RecentReportTable recentReportsData={recentReportsData}/>
    </>
  )
}