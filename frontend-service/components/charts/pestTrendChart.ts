import { MonthlyPestTrendData } from "@models/dashboard/employee/monthlyPest";
import { NextRouter } from "next/router";

export const PestTrendChartData: any = (monthlyPestTrendData: MonthlyPestTrendData[]) => {
  let fliesData = [];
  let cockroachData = [];
  let rodentData = [];
  let othersData = [];

  for (let pestData of monthlyPestTrendData){
    fliesData.push(pestData.flies);
    cockroachData.push(pestData.cockroach);
    rodentData.push(pestData.rodent);
    othersData.push(pestData.others);
  }

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
        label: 'Flies',
        data: fliesData,
        backgroundColor: 'rgb(0, 107, 211)',
        stack: 'Stack 0',
      },{
        label: 'Cockroach',
        data: cockroachData,
        backgroundColor: 'rgb(71, 190, 171)',
        stack: 'Stack 0',
      },{
        label: 'Rodent',
        data: rodentData,
        backgroundColor: 'rgb(239, 115, 115)',
        stack: 'Stack 0',
      },{
        label: 'Other',
        data: rodentData,
        backgroundColor: 'rgb(167, 165, 165)',
        stack: 'Stack 0',
      }
    ]
  }
}

export const PestTrendChartOptions: any = (monthlyPestTrendData: MonthlyPestTrendData[]) => {
  return {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };
}