import { Loading } from "@components/general/Loading";
import { Search } from "@components/general/Search";
import { Title } from "@components/general/Title";
import { InventoryContainer } from "@components/inventories/InventoryList";
import { AxiosClient, URL_INVENTORY } from "@constants/api";
import { ROLES } from "@constants/roles";
import { filterData } from "@functions/filterData";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { useAuth } from "@hooks/useAuth";
import { Pesticide, PesticideClass } from "@models/pestcontrol/Pesticide";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const ManageInventory: NextPage = () => {
  const [pesticides, setPesticides] = useState<Pesticide[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) return;
    async function retrieveAllInventory() {
      const results = await Promise.all([
        AxiosClient.get(`${URL_INVENTORY}/pesticides`),
      ]);
      const data: Pesticide[] = [];
      results.forEach((result) => {
        result.data.forEach((pesticide: any) => {
          data.push(new PesticideClass(pesticide));
        });
      });
      setPesticides(data);
      console.log(pesticides);
    }
    if (user.role != 1 && user.role != 2) {
      router.push("/");
    } else {
      retrieveAllInventory();
    }
  }, [user]);

  return (
    <div className="w-full">
      <section>
        <Title
          title="Stok Chemical"
          action={{
            name: "Tambah Chemical Baru",
            path: `/inventories/add`,
          }}
        />
      </section>
      <div>
        <Search
          setSearchTerm={setSearchTerm}
          placeholder={"Cari pestisida"}
        ></Search>
      </div>
      <section>
        {/* Start card */}
        <InventoryContainer
          data={filterData<Pesticide>(pesticides, searchTerm, [
            "name",
            "activeIngredient",
          ])}
        />
      </section>
    </div>
  );
};

export default withAuth(withLayout(ManageInventory));
