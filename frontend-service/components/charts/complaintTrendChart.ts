import { MonthlyPestTrendData } from "@models/dashboard/employee/monthlyPest";
import { NextRouter } from "next/router";

export const ComplaintTrendChartData: any = (complaintTrendChartData: number[]) => {
  return {
    labels: [
      "January", 
      "February", 
      "March", 
      "April", 
      "May", 
      "June", 
      "July", 
      "August", 
      "September", 
      "October", 
      "November", 
      "December"
    ],
    datasets: [
      {
        label: 'Komplain',
        data: complaintTrendChartData,
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ]
  }
}

export const ComplaintTrendChartOptions: any = (complaintTrendChartData: number[]) => {
  return {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
    },
  };
}