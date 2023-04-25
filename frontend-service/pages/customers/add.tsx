import { CustomerForm } from "@components/customers/CustomerForm";
import { Title } from "@components/general/Title";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { useAuth } from "@hooks/useAuth";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const AddCustomer: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) return;
  }, [user, router]);

  return (
    <div className="mb-4 w-full md:pt-0">
      <section>
        <Title title="Tambah Customer" />
        {<CustomerForm />}
      </section>
    </div>
  );
};
export default withAuth(withLayout(AddCustomer));
