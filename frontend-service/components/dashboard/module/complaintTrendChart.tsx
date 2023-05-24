import { useEffect, useState } from "react";
import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale,LinearScale,PointElement,LineElement,Title,Tooltip,Legend } from 'chart.js';
import { ComplaintData } from "@models/dashboard/employee/complaint";
import { useRouter } from "next/router";
import { ComplaintTrendChartData, ComplaintTrendChartOptions } from "@components/charts/complaintTrendChart";

Chart.register(CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend);

export const ComplaintTrendChart = ({
  complaintTrendData,
}: {  
  complaintTrendData: number[],
}) => {
  const router = useRouter();
  const [complaintTrendChartData, setComplaintTrendChartData] = useState(ComplaintTrendChartData(complaintTrendData));
  const [complaintTrendChartOptions, setComplaintTrendChartOptions] = useState(ComplaintTrendChartOptions(complaintTrendData));

  useEffect(() => {
    setComplaintTrendChartData(ComplaintTrendChartData(complaintTrendData));
    setComplaintTrendChartOptions(ComplaintTrendChartOptions(complaintTrendData));
  }, [complaintTrendData]);

  return (
    <div className="w-full">
      <div className="p-4">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="font-bold text-lg text-center">Trend Komplain</h1>
          <Line
              data={complaintTrendChartData}
              options={complaintTrendChartOptions}
              className="cursor-pointer"
            />
        </div>
      </div>
    </div>
  )
}