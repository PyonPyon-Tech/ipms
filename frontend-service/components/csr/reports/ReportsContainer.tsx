import { Search } from "@components/general/Search";
import { Title } from "@components/general/Title";
import { filterData, filterDataNested, filterDataOnlyNested } from "@functions/filterData";
import { CsrReportClass } from "@models/report/CsrReport";
import { OutletClass } from "@models/customer/outlet";
import { FC, useState } from "react";
import { TechnicianReportsCard } from "./ReportCard";
import { Checkbox } from "@mui/material";

export const ReportContainer : FC<{data: CsrReportClass[]}> = ({data})=>{
    const [searchTerm, setSearchTerm] = useState("")
    return <section>
      {/* <Search setSearchTerm={setSearchTerm} placeholder="Nama Customer atau Laporan" /> */}
      <div className="flex flex-row items-center space-x-4">
        {/* <Checkbox/> */}
        {/* <h4>0 Selected</h4> */}
        {/* <img className="object-fill h-6 w-6" src="/icons/download.svg" /> */}
      </div>
      {filterDataOnlyNested<CsrReportClass, OutletClass>(data, "outlet", searchTerm, ["name"]).map(obj=>{
        return <TechnicianReportsCard key={`report-card-${obj.id}`} data={obj} />
      })}
    </section>
}