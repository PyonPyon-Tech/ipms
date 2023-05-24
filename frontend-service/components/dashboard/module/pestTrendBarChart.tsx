import { MonthlyVisitationData } from "@models/dashboard/employee/monthlyVisitation";
import { useEffect, useState } from "react";
import { Bar, Doughnut } from 'react-chartjs-2';
import { Chart,CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Title, Legend } from 'chart.js';
import { ComplaintData } from "@models/dashboard/employee/complaint";
import { useRouter } from "next/router";
import { CsrReport } from "@models/report/CsrReport";
import { ComplaintChartData, ComplaintChartOptions } from "@components/charts/complaintChart";
import { PestTrendChartData, PestTrendChartOptions } from "@components/charts/pestTrendChart";
import { MonthlyPestTrendData } from "@models/dashboard/employee/monthlyPest";

Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const PestTrendBarChart = ({
  pestTrendData,
}: {  
  pestTrendData: MonthlyPestTrendData[], 
}) => {
  const [pestTrendDataChartData, setPestTrendDatahartData] = useState(PestTrendChartData(pestTrendData));
  const [pestTrendDataChartOptions, setPestTrendDataChartOptions] = useState(PestTrendChartOptions(pestTrendData));

  useEffect(() => {
    setPestTrendDatahartData(PestTrendChartData(pestTrendData));
    setPestTrendDataChartOptions(PestTrendChartOptions(pestTrendData));
  }, [pestTrendData]);

  return (
    <>
      <div className="w-full">
        <div className="p-4">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h1 className="font-bold text-lg text-center">
              Trend Temuan Hama
            </h1>
            <Bar
                data={pestTrendDataChartData}
                options={pestTrendDataChartOptions}
              />
          </div>
        </div>
      </div>
    </>
  )
}