import { CsrReportClass } from "@models/report/CsrReport";
import { Checkbox } from "@mui/material";
import { useRouter } from "next/router";
import { FC } from "react";

export const TechnicianReportsCard: FC<{ data: CsrReportClass }> = ({ data }) => {
  const router = useRouter();
  console.log(data);
  return (
    <div
      className="mb-4 flex w-full cursor-pointer items-center justify-between rounded-[5px] py-2 px-4 md:py-4 md:px-12 shadow-basic"
    >
      <div className="flex items-center gap-x-3 sm:gap-x-6 md:gap-x-8">
        {/* <Checkbox/> */}
        <div className="">
          <h5 className="text-sm font-bold md:mb-1 md:text-xl">
            {data.outlet.name} / CSR-{data.id}
          </h5>
          <div>
            <table className="table-auto text-xs font-medium md:text-sm">
              <tbody>
                <tr>
                  <td className="pr-2">Hari & Tanggal:</td>
                  <td>
                    {new Date(data.summaryDate).toLocaleDateString("id", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          router.push("/reports/detail/" + data.id);
        }}
        className={`rounded-md bg-blue py-1 px-3 text-center text-xs font-semibold text-white  md:text-base`}
      >
        Detail Laporan
      </div>
    </div>
  );
};
