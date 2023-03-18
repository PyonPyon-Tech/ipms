import { EmployeeForm } from "@components/employees/EmployeeForm";
import { Container } from "@components/general/Container";
import { Title } from "@components/general/Title";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { NextPage } from "next";

const AddEmployee: NextPage = () => {
  return (
    <div className="mb-4 w-full p-8 md:p-12 md:pt-0">
      <section>
        <Title title="Tambah Karyawan" />
        <EmployeeForm data={null} />
      </section>
    </div>
  );
};
export default withAuth(withLayout(AddEmployee));
