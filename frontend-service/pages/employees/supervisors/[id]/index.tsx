import { EmployeeDetail } from "@components/employees/EmployeeDetail";
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

const SupervisorDetail: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [employee, setEmployee] = useState<Employee>();
  useEffect(() => {
    if (!user) return;
    if (!router.query.id) return;
    async function retrieveEmployee() {
      AxiosClient.get(`${URL_EMPLOYEE}/supervisors/${router.query.id}`)
        .then((response) => {
          setEmployee(new EmployeeClass(response.data));
          console.log(response.data);
        })
        .catch((err: AxiosError) => {
          toast.error(err.message);
          console.log(err);
        });
    }
    if (user.role == 0 || user.role == 4) {
      router.push("/");
    } else {
      retrieveEmployee();
    }
  }, [user, router]);

  return (
    <div className="w-full">
      <section>
        <Title
          title="Detail Karyawan"
          action={{
            name: "Ubah",
            path: `/employees/supervisors/${router.query.id}/edit`,
          }}
        />
      </section>
      {!!employee && <EmployeeDetail {...employee} />}
    </div>
  );
};
export default withAuth(withLayout(SupervisorDetail));
