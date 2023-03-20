import { EmployeeContainer } from "@components/employees/EmployeeList";
import { Search } from "@components/general/Search";
import { Title } from "@components/general/Title";
import { AxiosClient, URL_EMPLOYEE } from "@constants/api";
import { filterData, filterDataNested } from "@functions/filterData";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { useAuth } from "@hooks/useAuth";
import { Employee, EmployeeClass } from "@models/pestcontrol/employee";
import { User } from "@models/user";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const SearchEmployees: NextPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { user } = useAuth();
  useEffect(() => {
    if (!user) return;
    async function retrieveAllEmployees() {
      const results = await Promise.all([
        AxiosClient.get(`${URL_EMPLOYEE}/administrators`),
        AxiosClient.get(`${URL_EMPLOYEE}/supervisors`),
        AxiosClient.get(`${URL_EMPLOYEE}/technicians`),
      ]);
      const data: Employee[] = [];
      results.forEach((result) => {
        result.data.forEach((employee: any) => {
          data.push(new EmployeeClass(employee));
        });
      });
      console.log(data);
      setEmployees(data);
    }
    retrieveAllEmployees();
  }, [user]);
  return (
    <div className="mb-4 w-full p-8 md:p-12 md:pt-0">
      <section>
        <Title
          title="Daftar Karyawan"
          action={{ name: "Tambah", path: "/employees/add" }}
        >
          <h4>Total: {employees.length} orang</h4>
        </Title>
        <Search setSearchTerm={setSearchTerm} placeholder="Nama Karyawan" />
      </section>
      <section>
        <EmployeeContainer
          data={filterDataNested<Employee, User>(
            employees,
            "user",
            searchTerm,
            ["address"],
            ["name", "username"]
          )}
        />
      </section>
    </div>
  );
};

export default withAuth(withLayout(SearchEmployees));
