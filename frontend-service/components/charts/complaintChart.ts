import { ComplaintData } from "@models/dashboard/customer/complaint"
import { NextRouter } from "next/router";

export const ComplaintChartData: any = (complaintData: ComplaintData) => {
  return {
    labels: [
      'Diproses',
      'Belum Diproses',
    ],
    datasets: [{
      label: 'Komplain',
      data: [
        complaintData.acknowledgedComplaints,
        complaintData.totalComplaints - complaintData.acknowledgedComplaints,
      ],
      backgroundColor: [
        'rgb(34, 197, 94)',
        'rgb(239, 68, 68)',
      ],
      hoverOffset: 4
    }]
  }
}

export const ComplaintChartOptions: any = (complaintData: ComplaintData, router: NextRouter) => {
  return {
    responsive: true,
    onClick: () => {
      router.push(`/complaints`)
    },
    plugins: {
      title: {
        display: true,
        text: `Komplain Diproses: ${complaintData.acknowledgedComplaints}/${complaintData.totalComplaints}`,
      },
      legend: {
        position: "top" as const,
      },
    }
  };
}