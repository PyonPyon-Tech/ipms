import { Title } from "@components/general/Title";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { NextPage } from "next";
import { AxiosClient, URL_CUSTOMER } from "@constants/api";
import { useAuth } from "@hooks/useAuth";
import { Customer, CustomerClass } from "@models/customer/customer";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CustomerEditForm } from "@components/customers/CustomerForm/edit";

const CustomerEdit: NextPage = () => {
    const { user } = useAuth();
    const router = useRouter();
  
    const [customer, setCustomer] = useState<Customer>();
    useEffect(() => {
      if (!user) return;
      if (!router.query.id) return;
      async function retrieveEmployee() {
        AxiosClient.get(`${URL_CUSTOMER}/${router.query.id}`)
          .then((response) => {
            setCustomer(new CustomerClass(response.data));
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
    <Title title="Ubah Detail Customer" />
    {!!customer && <CustomerEditForm data={customer} />}
  </div>;
};

export default withAuth(withLayout(CustomerEdit));
