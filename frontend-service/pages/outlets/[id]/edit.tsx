import { Title } from "@components/general/Title";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { NextPage } from "next";
import { AxiosClient, URL_CUSTOMER } from "@constants/api";
import { useAuth } from "@hooks/useAuth";
import { Outlet, OutletClass } from "@models/customer/outlet";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { OutletEditForm } from "@components/customers/OutletForm/edit";

const OutletEdit: NextPage = () => {
    const { user } = useAuth();
    const router = useRouter();
  
    const [outlet, setOutlet] = useState<Outlet>();
    useEffect(() => {
      if (!user) return;
      if (!router.query.id) return;
      async function retrieveEmployee() {
        AxiosClient.get(`${URL_CUSTOMER}/outlets/${router.query.id}`)
          .then((response) => {
            setOutlet(new OutletClass(response.data));
            console.log(response.data);
          })
          .catch((err: AxiosError) => {
            toast.error(err.message);
            console.log(err);
          });
      }
      retrieveEmployee();
    }, [user, router]);

  return <div className="w-full">
    <Title title="Ubah Detail Outlet" />
    {!!outlet && <OutletEditForm data={outlet} />}
  </div>;
};

export default withAuth(withLayout(OutletEdit));
