import { Search } from "@components/general/Search";
import { Title } from "@components/general/Title";
import { filterData, filterDataNested } from "@functions/filterData";
import { TechnicianOutlets } from "@models/pestcontrol/employee/technician";
import { User } from "@models/user";
import { FC, useState } from "react";
import { TechnicianOutletsCard } from "./TechnicianOutletsCard";

export const TechnicianOutletsContainer : FC<{data: TechnicianOutlets[]}> = ({data})=>{
    const [searchTerm, setSearchTerm] = useState("")
    return <section>
      <Title title="Pembagian Outlet" />
      <Search setSearchTerm={setSearchTerm} placeholder="Nama atau Daerah Teknisi" />
      {filterDataNested<TechnicianOutlets, User>(data, "user", searchTerm, ["region"], ["name"]).map(obj=>{
        return <TechnicianOutletsCard key={obj.user.username+"-card"} data={obj} />
      })}
    </section>
}