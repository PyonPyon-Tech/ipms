import { getPeriodFromDate } from "@functions/getPeriodFromDate";
import { useAuth } from "@hooks/useAuth";
import { LabelValue } from "@type/other";
import { ReportCategories } from "@type/report";
import { FC, useState } from "react";

const categoryChoices: ReportCategories[][] = [
  ["outlet"], // customer
  ["customer", "outlet", "supervisor", "technician"], // manager
  ["customer", "outlet", "supervisor", "technician"], // administrator
  ["outlet", "technician"], // supervisor
  ["outlet"], // technician
];

export const ReportFilter: FC<{ setItem: any; setPeriod: any; setCategory: any; category: ReportCategories | "" }> = ({
  setCategory,
  setItem,
  setPeriod,
  category,
}) => {
  const { user } = useAuth();
  const [options, setOptions] = useState<{ [K in ReportCategories]: LabelValue[] }>({
    customer: [],
    outlet: [],
    supervisor: [{label:"k", value: 9}],
    technician: [{label:"l", value: 10}],
  });
  if (!user) return <div></div>;

  return (
    <div className="grid grid-cols-1 gap-x-4 sm:grid-cols-3 lg:gap-x-8">
      <div className="grid grid-cols-3 items-baseline sm:grid-cols-1">
        <label htmlFor="periode">Pilih Bulan</label>
        <input
          type="month"
          defaultValue={new Date().toISOString().substring(0,7)}
          onChange={(e) => setPeriod(getPeriodFromDate(e.target.value))}
          className="monthInput col-span-2"
          id="periode"
        />
      </div>
      <div className="grid grid-cols-3 items-baseline sm:grid-cols-1">
        <label htmlFor="category">Pilih Filter</label>
        <select
          id="category"
          defaultValue={"DEFAULT"}
          className="col-span-2"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option disabled value={"DEFAULT"}>
            Pilih Filter...
          </option>
          {categoryChoices[user.role].map((category) => (
            <option key={"categoryChoices" + category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      {category && !!options ? (
        <div className="grid grid-cols-3 items-baseline sm:grid-cols-1">
          <label htmlFor="item" className="capitalize">
            Pilih {category}
          </label>
          <select id="item" defaultValue={""} className="col-span-2" onChange={(e) => setItem(e.target.value)}>
            <option value={""}> {/* jangan pakai disabled, kalau item sdh diubah, lalu kategori diganti, yg paling atas nggak akan jadi item*/}
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
