import { OutletForm } from "@components/customers/OutletForm";
import { Container } from "@components/general/Container";
import { Title } from "@components/general/Title";
import { AxiosClient, URL_CUSTOMER } from "@constants/api";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { useAuth } from "@hooks/useAuth";
import { Customer, CustomerClass } from "@models/customer/customer";
import { AxiosError } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddOutlet: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const id = parseInt(router.query.id as string);

  useEffect(() => {
    if (!user) return;
    if (isNaN(id)) return;
  }, [user, router, id]);

  return (
    <div className="mb-4 w-full p-8 md:p-12 md:pt-0">
      <section>
        <Title title="Tambah Outlet" />
        {<OutletForm />}
      </section>
    </div>
  );
};
export default withAuth(withLayout(AddOutlet));
