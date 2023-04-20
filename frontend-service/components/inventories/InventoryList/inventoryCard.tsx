import { Pesticide } from "@models/pestcontrol/Pesticide";
import { FC } from "react";
import { useRouter } from "next/router";

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
                router.push(`/inventory/${id}`);
            }}
            style={{ boxShadow: " 0px 0px 5px 0px rgba(197, 197, 197, 1)" }}
            className="mt-4 flex flex-col sm:flex-row justify-between rounded-[8px] p-4 align-middle"
        >
            <div className="flex-col">
                <div className="text pb-1 text-xl font-bold">
                    <h5 className="max-sm:text-center min-sm:text-left">{name}</h5>
                </div>
                <div className="text-xs">
                    <h5 className="max-sm:text-center min-sm:text-left">Bahan aktif: {activeIngredient} </h5>
                </div>
            </div>

            <div className="flex items-center max-sm:justify-center min-sm:justify-end gap-2 min-lg:mx-auto pt-2">
                <div className="flex h-6 w-6 items-center justify-center rounded bg-teal-dark">
                    <div>
                        <img src="/icons/plus.svg" />
                    </div>
                </div>
                <div>
                    <h5 className="text-xl font-bold"> {stock} </h5>
                </div>
                <div className="flex h-6 w-6 items-center justify-center rounded bg-orange">
                    <div>
                        <img src="/icons/minus.svg" />
                    </div>
                </div>
            </div>
        </div>
    );
};
