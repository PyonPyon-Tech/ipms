import { AxiosClient, URL_INVENTORY } from "@constants/api";
import { Pesticide } from "@models/pestcontrol/Pesticide";
import { useRouter } from "next/router";
import { FC } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export const PesticideEditForm: FC<Pesticide> = ({
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
        <div
            className="shadow-basic mt-4 flex flex-col gap-2 rounded-md p-4 align-middle"
        >
            <div className="flex gap-2">
                <h1 className="text-xl font-bold">{name}</h1>
            </div>
            <div>
                <div className="flex flex-row gap-4">
                    <div className="flex w-1/2 flex-col">
                        <h5 className="text-base font-bold">Bahan Aktif</h5>
                        <p className="pb-1 text-base">{activeIngredient}</p>

                        <h5 className="text-base font-bold">Target Pest</h5>
                        <p>
                            {targetPests?.map((targetPest) => (
                                <div className="text-base">
                                    {targetPest.name}
                                </div>
                            ))}
                        </p>
                    </div>
                    <div className="w-1/2 flex-col">
                        <h5 className="text-base font-bold">Target Chemical</h5>
                        <p className="pb-1 text-base">{targets}</p>

                        <h5 className="text-base font-bold">Unit</h5>
                        <p className="pb-1 text-base">{unit}</p>
                    </div>
                </div>
                <div>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex">
                            <div className="my-2 flex flex-col gap-2 round rounded-l-[8px] bg-orange-light p-4 align-middle w-1/2">
                                <h5 className="text-base font-bold">
                                    Stok Sekarang
                                </h5>
                                <p className="pb-1 text-base">{stock}</p>
                            </div>
                            <div className="my-2 flex flex-col gap-2 rounded-r-[8px] bg-teal-light p-4 align-middle w-1/2">
                                <h5 className="text-base font-bold">
                                    Stok Terbaru
                                </h5>

                                <input
                                    className="pb-1"
                                    type="number"
                                    {...register("stock")}
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="mt-4 w-full cursor-pointer rounded-md bg-blue py-1 px-2 text-xs font-medium text-white md:py-2 md:px-3 md:text-sm"
                        >
                            Simpan
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};
