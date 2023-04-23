import { Search } from "@components/general/Search";
import { Title } from "@components/general/Title";
import { InventoryContainer } from "@components/inventories/InventoryList";
import { AxiosClient, URL_INVENTORY } from "@constants/api";
import { filterData } from "@functions/filterData";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { useAuth } from "@hooks/useAuth";
import { Pesticide, PesticideClass } from "@models/pestcontrol/Pesticide";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const ManageInventory: NextPage = () => {
    const [pesticides, setPesticides] = useState<Pesticide[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const { user } = useAuth();
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
        retrieveAllInventory();
    }, [user]);
    return (
        <div className="w-full pr-8 md:pr-12 md:pt-0">
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
