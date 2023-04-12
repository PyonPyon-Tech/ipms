import { Search } from "@components/general/Search";
import { Title } from "@components/general/Title";
import { filterData } from "@functions/filterData";
import { OutletVisitations } from "@models/pestcontrol/outlets";
import { FC, useState } from "react";
import { OutletVisitationCard } from "./OutletVisitationCard";

export const OutletVisitationContainer: FC<{ data: OutletVisitations[], type: string }> = ({
  data,
  type,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  return (
    <section>
      <Title title="Daftar Outlet" />
      <Search setSearchTerm={setSearchTerm} placeholder="Nama atau Alamat Outlet" />
      {filterData(data, searchTerm, ["outletName", "outletAddress"]).map((x) => (
        <OutletVisitationCard key={"outlet"+x.outletId} data={x} type={type} />
      ))}
    </section>
  );
};
