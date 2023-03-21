import { TechnicianOutlets } from "@models/pestcontrol/employee/technician";
import { useRouter } from "next/router";
import { FC } from "react";

export const TechnicianOutletsCard: FC<{ data: TechnicianOutlets }> = ({
  data,
}) => {
  const router = useRouter();
  return (
    <div
      style={{ boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)" }}
      className="mb-4 flex w-full cursor-pointer items-center justify-between rounded-lg py-2 px-4 md:py-4 md:px-12"
    >
      <div className="flex items-center gap-x-3 sm:gap-x-6 md:gap-x-8">
        <img
          className="h-8 w-8 sm:h-12 sm:w-12 md:h-16 md:w-16"
          src="/icons/person.svg"
        />
        <div className="">
          <h5 className="text-sm font-bold md:mb-1 md:text-xl">
            {data.user.name}
          </h5>
          <div>
            <table className="table-auto text-xs font-medium md:text-sm">
              <tbody>
                <tr>
                  <td className="pr-4">Daerah Kerja</td>
                  <td className="pr-4">{`: ${data.region}`}</td>
                </tr>
                <tr>
                  <td className="pr-4">Jumlah Outlet</td>
                  <td className="pr-4">{`: ${data.outlets.length} Outlet`}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          router.push("/assignments/" + data.id);
        }}
        className={`rounded-md bg-blue py-1 px-3 text-center text-xs font-semibold text-white  md:text-base`}
      >
        Lihat Outlet
      </div>
    </div>
  );
};
