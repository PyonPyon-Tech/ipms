import { Chart, ArcElement, Tooltip, Title, Legend } from 'chart.js';
import { useRouter } from "next/router";
import { CsrReport } from "@models/report/CsrReport";

Chart.register(ArcElement, Tooltip, Title, Legend);

export const RecentReportTable = ({
  recentReportsData,
}: {  
  recentReportsData: CsrReport[],
}) => {
  const router = useRouter();
  return (
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
  )
}