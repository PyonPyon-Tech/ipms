import { AxiosClient, URL_REPORT } from "@constants/api";
import { getPeriodFromDate } from "@functions/getPeriodFromDate";
import { useAuth } from "@hooks/useAuth";
import { LabelValue } from "@type/other";
import { ListReportFilterDataInterface, ReportCategories } from "@type/listReport";
import { AxiosError } from "axios";
import { FC, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const categoryChoices: ReportCategories[][] = [
  ["outlet"], // customer
  ["customer", "outlet", "supervisor", "technician"], // manager
  ["customer", "outlet", "supervisor", "technician"], // administrator
  ["outlet", "technician"], // supervisor
  ["outlet"], // technician
];

export const ReportFilter: FC<{
  setPartialFilterData: (key: keyof ListReportFilterDataInterface, value: any) => void;
  category: ReportCategories | "DEFAULT";
}> = ({ setPartialFilterData, category }) => {
  const { user } = useAuth();
  const [options, setOptions] = useState<{ [K in ReportCategories]: LabelValue[] }>();
  useEffect(() => {
    if (!user || !!options) return;
    async function loadFilter() {
      AxiosClient.get(`${URL_REPORT}/filter`)
        .then((response) => {
          console.log(response.data);
          setOptions(response.data);
        })
        .catch((err: AxiosError) => {
          console.log(err);
          toast.error((err.response?.data as any).message);
        });
    }
    loadFilter();
  }, [user, options]);
  if (!user) return <div></div>;

  return (
    <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-3 mt-4 lg:gap-x-8">
      <div className="grid grid-cols-3 items-baseline sm:grid-cols-1">
        <label className="md:text-lg font-bold capitalize" htmlFor="periode">Pilih Bulan</label>
        <input
          type="month"
          defaultValue={new Date().toISOString().substring(0, 7)}
          onChange={(e) => setPartialFilterData("period", getPeriodFromDate(e.target.value))}
          className="monthInput col-span-2"
          id="periode"
        />
      </div>
      <div className="grid grid-cols-3 items-baseline sm:grid-cols-1">
        <label className="md:text-lg font-bold capitalize" htmlFor="category">Pilih Filter</label>
        <select
          id="category"
          defaultValue={"DEFAULT"}
          className="col-span-2"
          onChange={(e) => {
            setPartialFilterData("category", e.target.value);
          }}
        >
          <option value={"DEFAULT"}>
            Tanpa Filter
          </option>
          {categoryChoices[user.role].map((category) => (
            <option key={"categoryChoices" + category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      {category != "DEFAULT" && !!options ? (
        <div className="grid grid-cols-3 items-baseline sm:grid-cols-1">
          <label className="md:text-lg font-bold capitalize" htmlFor="item">
            Pilih {category}
          </label>
          <select
            id="item"
            defaultValue={"DEFAULT"}
            className="col-span-2"
            onChange={(e) => setPartialFilterData("item", e.target.value)}
          >
            <option value={"DEFAULT"}>
              Pilih {category}...
            </option>
            {options[category].map((option) => (
              <option key={"item" + category + option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
