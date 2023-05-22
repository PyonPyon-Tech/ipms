import { MonthlyVisitationData } from "@models/dashboard/employee/monthlyVisitation";
import { useEffect, useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Title, Legend } from 'chart.js';
import { ComplaintData } from "@models/dashboard/employee/complaint";
import { useRouter } from "next/router";
import { CsrReport } from "@models/report/CsrReport";
import { ComplaintChartData, ComplaintChartOptions } from "@components/charts/complaintChart";
import { MonthlyVisitationChartData, MonthlyVisitationChartOptions } from "@components/charts/monthlyVisitationChart";

Chart.register(ArcElement, Tooltip, Title, Legend);

export const VisitationRingChart = ({
  monthlyVisitationData,
}: {  
  monthlyVisitationData: MonthlyVisitationData, 
}) => {
  const [monthlyVisitationChartData, setMonthlyVisitationChartData] = useState(MonthlyVisitationChartData(monthlyVisitationData));
  const [monthlyVisitationChartOptions, setMonthlyVisitationChartOptions] = useState(MonthlyVisitationChartOptions(monthlyVisitationData));

  useEffect(() => {
    setMonthlyVisitationChartData(MonthlyVisitationChartData(monthlyVisitationData));
    setMonthlyVisitationChartOptions(MonthlyVisitationChartOptions(monthlyVisitationData));
  }, [monthlyVisitationData]);

  return (
    <>
      <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2">
        <div className="p-4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="font-bold text-lg text-center">
              Service Bulan {new Date().toLocaleString('id-ID', { month: 'long' })}
            </h1>
            {monthlyVisitationData.totalVisitations > 0 && <Doughnut
                data={monthlyVisitationChartData}
                options={monthlyVisitationChartOptions}
              />}
            {monthlyVisitationData.totalVisitations == 0 && 
            <p className="text-gray-500 text-center my-20">
              Belum ada jadwal service di bulan ini.
            </p>}
          </div>
        </div>
      </div>
    </>
  )
}