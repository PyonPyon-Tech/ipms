import { EmployeeForm } from "@components/employees/EmployeeForm";
import { Container } from "@components/general/Container";
import { Title } from "@components/general/Title";
import { AxiosClient, URL_EMPLOYEE } from "@constants/api";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { useAuth } from "@hooks/useAuth";
import { Employee, EmployeeClass } from "@models/pestcontrol/employee";
import { AxiosError } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddEmployee: NextPage = () => {
  const [supervisor, setSupervisor] = useState<Employee[]>();
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) return;
    async function retrieveEmployee() {
      AxiosClient.get(`${URL_EMPLOYEE}/supervisors`)
        .then((response) => {
          setSupervisor(response.data.map((x: any) => new EmployeeClass(x)));
          console.log(response.data);
        })
        .catch((err: AxiosError) => {
          toast.error(err.message);
          console.log(err);
        });
    }
    retrieveEmployee();
  }, [user, router]);

  return (
    <div className="mb-4 w-full md:pt-0">
      <section>
        <Title title="Tambah Karyawan" />
        {!!supervisor && <EmployeeForm supervisors={supervisor} />}
      </section>
    </div>
  );
};
export default withAuth(withLayout(AddEmployee));
