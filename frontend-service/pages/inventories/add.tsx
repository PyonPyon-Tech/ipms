import { Title } from "@components/general/Title";
import { InventoryForm } from "@components/inventories/InventoryForm";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { useAuth } from "@hooks/useAuth";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ManageInventory: NextPage = () => {
    const { user } = useAuth();
    const router = useRouter();
    useEffect(() => {
        if (!user) return;
    }, [user, router]);
    return(
        <div className="w-full pr-8 md:pr-12 md:pt-0">
            <section>
                <Title title="Tambah Barang Baru" />
                {<InventoryForm/>}
            </section>
        </div>
    );
};

export default withAuth(withLayout(ManageInventory));
