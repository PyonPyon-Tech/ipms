import { Title } from "@components/general/Title";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { NextPage } from "next";
import { AxiosClient, URL_CUSTOMER, URL_INVENTORY } from "@constants/api";
import { useAuth } from "@hooks/useAuth";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Pesticide, PesticideClass } from "@models/pestcontrol/Pesticide";
import { PesticideEditForm } from "@components/inventories/InventoryForm/edit";
const PesticideEdit: NextPage = () => {
    const { user } = useAuth();
    const router = useRouter();
  
    const [pesticide, setPesticide] = useState<Pesticide>();
    useEffect(() => {
      if (!user) return;
      if (!router.query.id) return;
      async function retrievePesticide() {
        AxiosClient.get(`${URL_INVENTORY}/pesticides/${router.query.id}`)
          .then((response) => {
            setPesticide(new PesticideClass(response.data));
            console.log(response.data);
          })
          .catch((err: AxiosError) => {
            toast.error(err.message);
            console.log(err);
          });
      }
      retrievePesticide();
    }, [user, router]);


  return <div className="w-full p-8 md:p-12 md:pt-0">
    <Title title="Ubah Stok Chemical" />
    {!!pesticide && <PesticideEditForm {...pesticide} />}
  </div>;
};

export default withAuth(withLayout(PesticideEdit));
