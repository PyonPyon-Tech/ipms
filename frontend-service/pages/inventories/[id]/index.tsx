import { InventoryDetail } from "@components/inventories/InventoryDetail";
import { Title } from "@components/general/Title";
import { AxiosClient, URL_INVENTORY } from "@constants/api";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { useAuth } from "@hooks/useAuth";
import { Pesticide, PesticideClass } from "@models/pestcontrol/Pesticide";
import { AxiosError } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const PesticideDetail: NextPage = () => {
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
          console.log("print response data")
          console.log(response.data);
        })
        .catch((err: AxiosError) => {
          toast.error(err.message);
          console.log(err);
        });
    }
    retrievePesticide();
  }, [user, router]);

  return (
    <div className="w-full">
      <section>
        <Title
          title="Detail Chemical"
          action={{
            name: "Update Stok",
            path: `/inventories/${router.query.id}/edit`,
        }}
        />
      </section>
      {!!pesticide && <InventoryDetail {...pesticide} />}
    </div>
  );
};
export default withAuth(withLayout(PesticideDetail));
