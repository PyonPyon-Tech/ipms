import { CsrReportClass } from "@models/report/CsrReport";
import { Checkbox } from "@mui/material";
import { useRouter } from "next/router";
import { FC } from "react";

export const TechnicianReportsCard: FC<{ data: CsrReportClass }> = ({
  data,
}) => {
  const router = useRouter();
  return (
    <div
      style={{ boxShadow: " 0px 0px 5px 0px rgba(197, 197, 197, 1)"}}
      className="mb-4 flex w-full cursor-pointer items-center justify-between rounded-[5px] py-2 px-4 md:py-4 md:px-12"
    >
      <div className="flex items-center gap-x-3 sm:gap-x-6 md:gap-x-8">
        <Checkbox/>
        <div className="">
          <h5 className="text-sm font-bold md:mb-1 md:text-xl">
            {data.outlet.name}
          </h5>
          <div>
            <table className="table-auto text-xs font-medium md:text-sm">
              <tbody>
                <tr>
                  <td className="pr-2">Tanggal:</td>
                  <td className="pr-4">
                    {data.date}
                    </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div
        // onClick={() => {
        //   router.push("/assignments/" + data.id);
        // }}
        className={`rounded-md bg-blue py-1 px-3 text-center text-xs font-semibold text-white  md:text-base`}
      >
        Detail Laporan
      </div>
    </div>
  );
};
