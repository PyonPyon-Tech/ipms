import { Button } from "@components/general/Button";
import { TechnicianOutlets } from "@models/pestcontrol/employee/technician";
import { useRouter } from "next/router";
import { FC } from "react";

export const TechnicianOutletsCard: FC<{ data: TechnicianOutlets }> = ({
  data,
}) => {
  const router = useRouter();
  return (
    <div className="mb-4 flex w-full cursor-pointer items-center justify-between rounded-[5px] py-2 px-2 shadow-basic md:py-4 md:px-8">
        <div className="flex items-center gap-x-2 md:gap-x-4">
        <img
            className="h-8 w-8 sm:h-8 sm:w-8 md:h-12 md:w-12"
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
      <Button
        action={{
          name: "Lihat Outlet",
          func: () => {
            router.push("/assignments/" + data.id);
          },
        }}
      ></Button>
    </div>
  );
};
