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
    if (user.role != 1 && user.role != 2) {
      router.push("/");
    }
  }, [user, router]);
  return (
    <div className="w-full">
      <section>
        <Title title="Tambah Chemical Baru" />
        {<InventoryForm />}
      </section>
    </div>
  );
};

export default withAuth(withLayout(ManageInventory));
