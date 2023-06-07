import { OutletDetail } from "@components/customers/OutletDetail";
import { filterData, filterDataNested } from "@functions/filterData";
import { Title } from "@components/general/Title";
import { AxiosClient, URL_CUSTOMER } from "@constants/api";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { useAuth } from "@hooks/useAuth";
import { Outlet, OutletClass } from "@models/customer/outlet";
import { AxiosError } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const OutletDetailPage: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [outlet, setOutlet] = useState<Outlet>();

  useEffect(() => {
    if (!user) return;
    if (!router.query.id) return;
    async function retrieveOutlet() {
      AxiosClient.get(`${URL_CUSTOMER}/outlets/${router.query.id}`)
        .then((response) => {
          let outletObj = new OutletClass(response.data);
          setOutlet(outletObj);
          console.log(response.data);
        })
        .catch((err: AxiosError) => {
          toast.error(err.message);
          console.log(err);
        });
    }
    if (user.role == 0) {
      router.push("/");
    } else {
      retrieveOutlet();
    }
  }, [user, router]);

  return (
    <div className="w-full">
      <section>
        <Title
          title="Detail Outlet"
          action={{
            name: "Ubah",
            path: `/outlets/${router.query.id}/edit`,
          }}
        />
      </section>

      {!!outlet && <OutletDetail {...outlet} />}
    </div>
  );
};
export default withAuth(withLayout(OutletDetailPage));
