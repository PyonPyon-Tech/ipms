import { Button } from "@components/general/Button";
import { AxiosClient, URL_INVENTORY } from "@constants/api";
import { Pesticide } from "@models/pestcontrol/Pesticide";
import { useRouter } from "next/router";
import { FC } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const InventoryEditStock: FC<Pesticide> = ({
    id,
    name,
    activeIngredient,
    stock,
    targets,
    unit,
    targetPests,
}) => {
    const router = useRouter();
    const { register, handleSubmit } = useForm();
    const onSubmit = async (data: any) => {
        console.log(data);
        const submittedData = {
            name: data.name,
            stock: Number(data.stock),
            activeIngredient: data.activeIngredient,
            unit: data.unit,
            targets: data.targets,
            targetPests: targetPests,
        };
        AxiosClient.put(
            `${URL_INVENTORY}/pesticides/${router.query.id}`,
            submittedData
        )
            .then((response) => {
                console.log(response.data);
                toast.success("Sukses mengedit pestisida", {
                    duration: 5000,
                });
                router.push(`/inventories/${router.query.id}`);
            })
            .catch((error) => {
                toast.error(error.message);
                console.log(error);
            });
    };
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex">
                    <div className="round my-2 flex w-1/2 flex-col gap-2 rounded-l-[8px] bg-orange-light p-4 align-middle">
                        <h5 className="text-base font-bold">Stok Sekarang</h5>
                        <p className="pb-1 text-base">{stock}</p>
                    </div>
                    <div className="my-2 flex w-1/2 flex-col gap-2 rounded-r-[8px] bg-teal-light p-4 align-middle">
                        <h5 className="text-base font-bold">Stok Terbaru</h5>

                        <input
                            className="pb-1"
                            type="number"
                            {...register("stock")}
                        />
                    </div>
                </div>
                <Button
                    className="w-full"
                    action={{ name: "Simpan", submit: true }}
                ></Button>
            </form>
        </div>
    );
};
