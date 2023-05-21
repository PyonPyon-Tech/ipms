import { InventoryDetail, InventoryDetailStock } from "@components/inventories/InventoryDetail";
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
        })
        .catch((err: AxiosError) => {
          toast.error(err.message);
        });
    }
    if (user.role == 1 || user.role == 2 || user.role == 4 ) {
      router.push("/");
    } else {
      retrievePesticide();
    }

  }, [user, router]);

  return (
    <div className="w-full">
        <Title
          title="Detail Chemical"
          action={{
            name: "Update Stok",
            path: `/inventories/${router.query.id}/edit`,
          }}
        />
      {!!pesticide && (
        <InventoryDetail data={pesticide}>
          <InventoryDetailStock {...pesticide} />
        </InventoryDetail>
      )}
    </div>
  );
};
export default withAuth(withLayout(PesticideDetail));
