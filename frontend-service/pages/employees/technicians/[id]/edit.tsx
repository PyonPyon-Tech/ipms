import { Title } from "@components/general/Title";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { NextPage } from "next";
import { EmployeeDetail } from "@components/employees/EmployeeDetail";
import { AxiosClient, URL_EMPLOYEE } from "@constants/api";
import { useAuth } from "@hooks/useAuth";
import { Employee, EmployeeClass } from "@models/pestcontrol/employee";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { EmployeeForm } from "@components/employees/EmployeeForm";
import { EmployeeAdminEditForm } from "@components/employees/EmployeeForm/edit/admin";
import { EmployeeTechnicianEditForm } from "@components/employees/EmployeeForm/edit/technician";

const AdminEdit: NextPage = () => {
    const { user } = useAuth();
    const router = useRouter();
  
    const [employee, setEmployee] = useState<Employee>();
    useEffect(() => {
      if (!user) return;
      if (!router.query.id) return;
      async function retrieveEmployee() {
        AxiosClient.get(`${URL_EMPLOYEE}/technicians/${router.query.id}`)
          .then((response) => {
            setEmployee(new EmployeeClass(response.data));
            console.log(response.data);
          })
          .catch((err: AxiosError) => {
            toast.error(err.message);
            console.log(err);
          });
      }
      retrieveEmployee();
    }, [user, router]);

  return <div className="w-full p-8 md:p-12 md:pt-0">
    <Title title="Ubah Detail Karyawan" />
    {!!employee && <EmployeeTechnicianEditForm data={employee} />}
  </div>;
};

export default withAuth(withLayout(AdminEdit));
