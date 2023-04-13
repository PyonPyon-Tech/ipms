import { Title } from "@components/general/Title";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { NextPage } from "next";

const ManageInventory: NextPage = () => {
    return (
        <div className="w-full p-8 md:p-12 md:pt-0">
            <section>
                <Title title="Tambah Barang Baru" />
            </section>
            <div
                style={{ boxShadow: " 0px 0px 5px 0px rgba(197, 197, 197, 1)" }}
                className="mt-4 w-full flex-col justify-evenly rounded-[8px] p-4 pb-5 align-middle"
            >
                <form action="" className="w-full flex-col">
                    <h5 className="text-base font-bold">Nama Chemical</h5>
                    <input required />
                    <h5 className="text-base font-bold">Bahan Aktif</h5>
                    <input />
                    <h5 className="text-base font-bold">Stok</h5>
                    <input required type="number" />
                </form>
                <button
                    type="submit"
                    className="w-full mt-4 cursor-pointer rounded-lg bg-blue py-1 px-2 text-xs font-medium text-white md:py-2 md:px-3 md:text-sm"
                >
                    Simpan
                </button>
            </div>
        </div>
    );
};

export default withAuth(withLayout(ManageInventory));
