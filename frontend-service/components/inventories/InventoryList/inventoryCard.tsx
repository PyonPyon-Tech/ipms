import {Pesticide} from "@models/pestcontrol/Pesticide"
import { FC } from "react";
import { useRouter } from "next/router";

export const InventoryCard: FC<Pesticide> = ({
    id,
    name,
    activeIngredient,
    stock,
}) => {
    const router = useRouter()
    return(
        <div
        onClick={()=>{
            router.push(`/inventory/${id}`)
          }}
        style={{ boxShadow: " 0px 0px 5px 0px rgba(197, 197, 197, 1)" }}
        className="flex rounded-[8px] p-4 align-middle justify-between mt-4 flex-wrap"
    >
        <div>
            <div className="pb-1 text-xl text font-bold text max-lg:text-center">
                <h5>{name}</h5>
            </div>
            <div className="text-xs max-lg:text-center">
                <h5>Bahan aktif: {activeIngredient} </h5>
            </div>
        </div>

        <div className="flex gap-2 items-center max-lg:mx-auto max-lg:pt-2">
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
    )
}