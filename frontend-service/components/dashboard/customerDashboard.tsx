import { MonthlyVisitationData } from "@models/dashboard/customer/monthlyVisitation";
import { useEffect, useState } from "react";
import { Doughnut } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Title, Legend } from 'chart.js';
import { ComplaintData } from "@models/dashboard/customer/complaint";
import { useRouter } from "next/router";
import { CsrReport } from "@models/report/CsrReport";

Chart.register(ArcElement, Tooltip, Title, Legend);

export const CustomerDashboard = ({
  monthlyVisitationData,
  complaintData,
  recentReportsData,
}: {  
  monthlyVisitationData: MonthlyVisitationData, 
  complaintData: ComplaintData,
  recentReportsData: CsrReport[],
}) => {
  const router = useRouter();
  const [monthlyVisitationChartData, setMonthlyVisitationChartData] = useState({
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
  });

  const [monthlyVisitationChartOptions, setMonthlyVisitationChartOptions] = useState({
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
  });

  const [complaintChartData, setComplaintChartData] = useState({
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
  });

  const [complaintChartOptions, setComplaintChartOptions] = useState({
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
  });

  useEffect(() => {
    setMonthlyVisitationChartData({
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
    });

    setMonthlyVisitationChartOptions({
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
    });

    setComplaintChartData({
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
    });

    setComplaintChartOptions({
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
    });
  }, [monthlyVisitationData, complaintData]);

  return (
    <>
      <div className="flex flex-wrap">
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
      </div>

      <div className="mt-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="font-bold text-xl text-center">
            Laporan Terbaru
          </h1>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4">Outlet</th>
                  <th className="py-2 px-4">Tanggal</th>
                  <th className="py-2 px-4">Teknisi</th>
                </tr>
              </thead>
              <tbody>
                {recentReportsData.map((report) => {
                  return (<tr className="border-t border-gray-200 cursor-pointer hover:bg-gray-100" onClick={
                        () => router.push(`/reports/detail/${report.id}`)
                      }>
                    <td className="py-2 px-4">{report.outlet.name}</td>
                    <td className="py-2 px-4">{report.date}</td>
                    <td className="py-2 px-4">{report.technician.user.name}</td>
                  </tr>);
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}