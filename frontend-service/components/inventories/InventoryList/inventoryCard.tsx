import { Pesticide } from "@models/pestcontrol/Pesticide";
import { FC } from "react";
import { useRouter } from "next/router";
import { URL_INVENTORY } from "@constants/api";

export const InventoryCard: FC<Pesticide> = ({
    id,
    name,
    activeIngredient,
    stock,
}) => {
    const router = useRouter();
    return (
        <div
            onClick={() => {
                router.push(`inventories/${id}`);
            }}
            className="shadow-basic mb-4 flex flex-col justify-between rounded-md p-4 align-middle sm:flex-row"
        >
            <div className="flex-col">
                <div className="text pb-1 text-xl font-bold">
                    <h5 className="min-sm:text-left max-sm:text-center">
                        {name}
                    </h5>
                </div>
                <div className="text-xs">
                    <h5 className="min-sm:text-left max-sm:text-center">
                        Bahan aktif: {activeIngredient}{" "}
                    </h5>
                </div>
            </div>

            <div
                onClick={() => router.push(`inventories/${id}/edit`)}
                className="min-sm:justify-end min-lg:mx-auto flex items-center pt-2 max-sm:justify-center"
            >
                <div className="flex gap-1 items-center cursor-pointer rounded-l-[8px] bg-orange py-1 px-2 text-xs font-medium text-white md:py-2 md:px-3 md:text-sm">
                    <p>Stok:</p>
                    <h5 className="text-base font-bold"> {stock} </h5>
                </div>
                <div className="cursor-pointer rounded-r-[8px] bg-teal-dark py-1 px-2 text-xs font-medium text-white md:py-2 md:px-3 md:text-sm">
                <h5 className="text-base"> Update </h5>
                </div>
            </div>
        </div>
    );
};
