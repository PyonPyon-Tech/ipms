import { Search } from "@components/general/Search";
import { Title } from "@components/general/Title";
import { filterData, filterDataNested, filterDataOnlyNested } from "@functions/filterData";
import { CsrReportClass } from "@models/report/CsrReport";
import { OutletClass } from "@models/customer/outlet";
import { FC, useState } from "react";
import { TechnicianReportsCard } from "./TechnicianReportsCard";
import { Checkbox } from "@mui/material";

export const TechnicianReportsContainer : FC<{data: CsrReportClass[]}> = ({data})=>{
    const [searchTerm, setSearchTerm] = useState("")
    return <section>
      <Title title="Daftar Laporan ECO-101" />
      <Search setSearchTerm={setSearchTerm} placeholder="Nama Customer atau Laporan" />
      <div className="flex flex-row items-center space-x-4">
        <Checkbox/>
        <h4>0 Selected</h4>
        <img className="object-fill h-6 w-6" src="/icons/download.svg" />
      </div>
      {filterDataOnlyNested<CsrReportClass, OutletClass>(data, "outlet", searchTerm, ["name"],).map(obj=>{
        return <TechnicianReportsCard key={obj.technician+"-card"} data={obj} />
      })}
    </section>
}