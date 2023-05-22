import { MonthlyVisitationData } from "@models/dashboard/employee/monthlyVisitation";
import { useEffect, useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Title, Legend } from 'chart.js';
import { ComplaintData } from "@models/dashboard/employee/complaint";
import { useRouter } from "next/router";
import { CsrReport } from "@models/report/CsrReport";
import { ComplaintChartData, ComplaintChartOptions } from "@components/charts/complaintChart";
import { MonthlyVisitationChartData, MonthlyVisitationChartOptions } from "@components/charts/monthlyVisitationChart";
import { Pesticide } from "@models/pestcontrol/Pesticide";

Chart.register(ArcElement, Tooltip, Title, Legend);

export const ComplaintRingChart = ({
  complaintData,
}: {  
  complaintData: ComplaintData,
}) => {
  const router = useRouter();
  const [complaintChartData, setComplaintChartData] = useState(ComplaintChartData(complaintData));
  const [complaintChartOptions, setComplaintChartOptions] = useState(ComplaintChartOptions(complaintData, router));

  useEffect(() => {
    setComplaintChartData(ComplaintChartData(complaintData));
    setComplaintChartOptions(ComplaintChartOptions(complaintData, router));
  }, [complaintData]);

  return (
    <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
      <div className="p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="font-bold text-lg text-center">Komplain</h1>
          {complaintData.totalComplaints > 0 && <Doughnut
              data={complaintChartData}
              options={complaintChartOptions}
              className="cursor-pointer"
            />}
          {complaintData.totalComplaints == 0 && <p className="text-gray-500 text-center my-20">Belum ada komplain.</p>}
        </div>
      </div>
    </div>
  )
}