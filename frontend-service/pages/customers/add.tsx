import { CustomerForm } from "@components/customers/CustomerForm";
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

const AddCustomer: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  useEffect(() => {
    if (!user) return;
    // async function retrieveCustomer() {
    //   AxiosClient.get(`${URL_CUSTOMER}`)
    //     .then((response) => {
    //       // setCustomer(response.data.map((x: any) => new CustomerClass(x)));
    //       console.log(response.data);
    //     })
    //     .catch((err: AxiosError) => {
    //       toast.error(err.message);
    //       console.log(err);
    //     });
    // }
    // retrieveCustomer();
  }, [user, router]);

  return (
    <div className="mb-4 w-full p-8 md:p-12 md:pt-0">
      <section>
        <Title title="Tambah Customer" />
        {<CustomerForm />}
      </section>
    </div>
  );
};
export default withAuth(withLayout(AddCustomer));
