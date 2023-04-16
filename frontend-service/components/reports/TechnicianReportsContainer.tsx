import { Search } from "@components/general/Search";
import { Title } from "@components/general/Title";
import { filterData, filterDataNested } from "@functions/filterData";
import { TechnicianOutlets } from "@models/pestcontrol/employee/technician";
import { User } from "@models/user";
import { FC, useState } from "react";
import { TechnicianReportsCard } from "./TechnicianReportsCard";
import { Checkbox } from "@mui/material";

export const TechnicianReportsContainer : FC<{data: TechnicianOutlets[]}> = ({data})=>{
    const [searchTerm, setSearchTerm] = useState("")
    return <section>
      <Title title="Daftar Laporan ECO-101" />
      <Search setSearchTerm={setSearchTerm} placeholder="Nama Customer atau Laporan" />
      <div className="flex flex-row items-center space-x-4">
        <Checkbox/>
        <h4>0 Selected</h4>
        <img className="object-fill h-6 w-6" src="/icons/download.svg" />
      </div>
      <TechnicianReportsCard key={"eji"+"-card"}/>
      {/* {filterDataNested<TechnicianOutlets, User>(data, "user", searchTerm, ["region"], ["name"]).map(obj=>{
        return <TechnicianOutletsCard key={obj.user.username+"-card"} data={obj} />
      })} */}
    </section>
}