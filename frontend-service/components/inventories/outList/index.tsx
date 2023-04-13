import { Pesticide } from "@models/pestcontrol/Pesticide"
import { FC } from "react";
import { PesticideCard } from "./PesticideCard";

export const PesticideContainer: FC<{data: Pesticide[], cart: Map<number, number>, setCart: (cart: Map<number, number>,) => void}> = ({
  data,
  cart,
  setCart
})=>{
  return <div className="w-full">
      {data.map(pesticide => <PesticideCard pesticide={pesticide} key={pesticide.id} cart= {cart}
          setCart = {setCart} />)}
  </div>
}