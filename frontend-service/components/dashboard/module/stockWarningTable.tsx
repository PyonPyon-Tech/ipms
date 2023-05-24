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

export const StockWarningTable = ({
  stockWarningData,
}: {  
  stockWarningData: Pesticide[],
}) => {
  const router = useRouter();

  return (
    <div className="mt-8">
        <div className="bg-white shadow-md rounded-lg p-6">
          <h1 className="font-bold text-xl text-center">
            Stock Inventory Warning
          </h1>
          <div className="overflow-x-auto mt-4">
            <table className="min-w-full bg-white rounded-lg">
              <thead className="bg-gray-200">
                <tr>
                  <th className="py-2 px-4">Nama Barang</th>
                  <th className="py-2 px-4">Sisa Stock</th>
                </tr>
              </thead>
              <tbody>
                {stockWarningData.map((pesticide) => {
                  return (<tr className="border-t border-gray-200 cursor-pointer hover:bg-gray-100" onClick={
                        () => router.push(`/inventories/${pesticide.id}/edit`)
                      }>
                    <td className="py-2 px-4">{pesticide.name}</td>
                    <td className="py-2 px-4">
                      { pesticide.stock == 0 &&
                      <div
                      className={`rounded-full bg-coral-dark py-1 px-4 text-center font-semibold align-middle text-xs text-white md:text-base` }>
                          <p>empty</p>
                      </div>
                      }
                      { pesticide.stock > 0 &&
                      <div
                      className={`rounded-full bg-orange py-1 px-4 text-center font-semibold align-middle text-xs text-white md:text-base` }>
                          <p>low stock ({pesticide.stock})</p>
                      </div>
                      }
                    </td>
                  </tr>);
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
  )
}