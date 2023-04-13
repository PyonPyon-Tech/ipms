import { Search } from "@components/general/Search";
import { Title } from "@components/general/Title";
import { InventoryContainer } from "@components/inventories/InventoryList";
import Breadcrumbs from "@components/layout/breadcrumbs";
import { AxiosClient, URL_INVENTORY } from "@constants/api";
import { filterData, filterDataNested } from "@functions/filterData";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { useAuth } from "@hooks/useAuth";
import { Pesticide, PesticideClass } from "@models/pestcontrol/Pesticide";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const ManageInventory: NextPage = () => {
    return (
        <div className="w-full p-8 md:p-12 md:pt-0">
            <Breadcrumbs />
            <section>
                <Title title="Tambah Barang Baru" />
            </section>
            <form action="">
                <h5>Nama Chemical</h5>
                <input required />
                <h5>Bahan Aktif</h5>
                <input />
                <h5>Stok</h5>
                <input required type="number" />
            </form>
        </div>
    );
};

export default withAuth(withLayout(ManageInventory));
