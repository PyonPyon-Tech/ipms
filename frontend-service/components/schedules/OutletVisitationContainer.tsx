import { Search } from "@components/general/Search";
import { Title } from "@components/general/Title";
import { filterData } from "@functions/filterData";
import { OutletVisitations } from "@models/pestcontrol/outlets";
import { FC, useEffect, useState } from "react";
import { OutletVisitationCard } from "./OutletVisitationCard";
import { Employee, EmployeeClass } from "@models/pestcontrol/employee";
import { AxiosClient, URL_EMPLOYEE } from "@constants/api";

export const OutletVisitationContainer: FC<{ data: OutletVisitations[], type: string }> = ({
  data,
  type,
}) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [technicianList, setTechnicianList] = useState<EmployeeClass[]>();

  useEffect(() => {
    async function retrieveAllTechnicians() {
      const result = await AxiosClient.get(`${URL_EMPLOYEE}/supervisors/technicians`);

      const data: EmployeeClass[] = [];

      result.data.forEach((technician: any) => {
        let technicianObj = new EmployeeClass(technician);
        data.push(technicianObj);
      });

      setTechnicianList(data);
    }
    
    if (type === `supervisor`)
      retrieveAllTechnicians();
  }, [type]);

  return (
    <section>
      <Title title="Daftar Outlet" />
      <Search setSearchTerm={setSearchTerm} placeholder="Nama atau Alamat Outlet" />
      {filterData(data, searchTerm, ["outletName", "outletAddress"]).map((x) => (
        <OutletVisitationCard key={"outlet"+x.outletId} data={x} type={type} technicians={technicianList} />
      ))}
    </section>
  );
};
