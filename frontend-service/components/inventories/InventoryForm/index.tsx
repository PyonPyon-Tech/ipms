import { AxiosClient, URL_INVENTORY } from "@constants/api";
import { Pesticide, PesticideMutation } from "@models/pestcontrol/Pesticide";
import { PesticideFormFactory } from "@models/pestcontrol/Pesticide/form";
import { useRouter } from "next/router";
import { FC } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const InventoryForm: FC<{}> = ({}) => {
    const router = useRouter();
    const { register, handleSubmit } = useForm<Pesticide>();
    const onSubmit = async (data: Pesticide) => {
        let pesticide: PesticideMutation | null = null;

        pesticide = PesticideFormFactory.pesticideMutationFromData(data);

        console.log("INVENTORY FORM");
        AxiosClient.post(`${URL_INVENTORY}`, pesticide)
            .then((response) => {
                console.log(response.data);
                toast.success("Sukses menambahkan pestisida", {
                    duration: 5000,
                });
                router.push(`/inventories/${response.data.id}`);
            })
            .catch((error) => {
                toast.error(error.message);
                console.log(error);
            });
    };
    return (
        <div
            style={{ boxShadow: " 0px 0px 5px 0px rgba(197, 197, 197, 1)" }}
            className="mt-4 w-full flex-col justify-evenly rounded-[8px] p-4 pb-5 align-middle"
        >
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex-col">
                <h5 className="text-base font-bold">Nama Chemical</h5>
                <input required {...register("name")} />
                <h5 className="text-base font-bold">Bahan Aktif</h5>
                <input {...register("activeIngredient")} />
                <h5 className="text-base font-bold">Stok</h5>
                <input required type="number" {...register("stock")} />
            </form>
            <button
                type="submit"
                className="mt-4 w-full cursor-pointer rounded-lg bg-blue py-1 px-2 text-xs font-medium text-white md:py-2 md:px-3 md:text-sm"
            >
                Simpan
            </button>
        </div>
    );
};
