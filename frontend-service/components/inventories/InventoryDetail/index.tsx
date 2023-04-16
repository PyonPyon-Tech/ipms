import { Container } from "@components/general/Container";
import { Pesticide } from "@models/pestcontrol/Pesticide";
import { FC } from "react";

export const InventoryDetail: FC<Pesticide> = ({
    id,
    name,
    activeIngredient,
    stock,
    targets,
    unit,
    targetPests,
}) => {
    return (
        <div
            style={{ boxShadow: " 0px 0px 5px 0px rgba(197, 197, 197, 1)" }}
            className="mt-4 flex flex-col gap-2 rounded-[8px] p-4 align-middle"
        >
            <div className="flex gap-2">
                <h1 className="text-2xl font-bold">{name}</h1>
            </div>
            <div className="flex flex-row">
                <div className="flex w-1/2 flex-col">
                    <h5 className="text-base font-bold">Bahan Aktif</h5>
                    <p className="pb-1 text-base">{activeIngredient}</p>

                    <h5 className="font-bold">Target Pest</h5>
                    <p>
                        {targetPests?.map((targetPest) => (
                            <div className="text-base">{targetPest.name}</div>
                        ))}
                    </p>
                </div>
                <div className="w-1/2 flex-col">
                    <h5 className="font-bold">Target Chemical</h5>
                    <p className="pb-1 text-base">{targets}</p>

                    <h5 className="font-bold">Unit</h5>
                    <p className="pb-1 text-base">{unit}</p>
                </div>
            </div>
            <div className="my-2 flex justify-center flex-col gap-2 rounded-[8px] bg-blue-light p-4 align-middle">
                <h5 className="text-base font-bold text-center">Stok Sekarang</h5>
                <p className="pb-1 text-base text-center">{stock}</p>
            </div>
        </div>
    );
};
