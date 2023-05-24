import { MonthlyVisitationData } from "@models/dashboard/customer/monthlyVisitation";

export const MonthlyVisitationChartData = (monthlyVisitationData: MonthlyVisitationData) => {
  return {
    labels: [
      'Akan Dikerjakan',
      'Selesai',
    ],
    datasets: [{
      label: 'Service',
      data: [
        monthlyVisitationData.totalVisitations - monthlyVisitationData.completedVisitations,
        monthlyVisitationData.completedVisitations, 
      ],
      backgroundColor: [
        'rgb(217, 217, 217)',
        'rgb(0, 107, 211)',
      ],
      hoverOffset: 4
    }]
  };
}

export const MonthlyVisitationChartOptions = (monthlyVisitationData: MonthlyVisitationData) => {
  return {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Service Selesai: ${monthlyVisitationData.completedVisitations}/${monthlyVisitationData.totalVisitations}`,
      },
      legend: {
        position: "top" as const,
      },
    }
  };
}