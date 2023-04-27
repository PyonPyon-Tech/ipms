import {Pesticide, PesticideClass} from "@models/pestcontrol/Pesticide"
import { FC } from "react";
import { InventoryCard } from "./inventoryCard";

export const InventoryContainer: FC<{data:Pesticide[]}> = ({data})=>{
    return <div className="w-full">
        {data.map(pesticide=> <InventoryCard {...pesticide} key={pesticide.id} />)}
    </div>
}