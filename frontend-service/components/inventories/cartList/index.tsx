import { Pesticide } from "@models/pestcontrol/Pesticide"
import { FC } from "react";
import { CartCard } from "./CartCard";

export const PesticideContainer: FC<{data: Pesticide[], cart: Map<number, number>, setCart: (cart: Map<number, number>,) => void}> = ({
  data,
  cart,
  setCart
})=>{
  return <div className="w-full">
      {data.map(pesticide => <CartCard pesticide={pesticide} key={pesticide.id} cart= {cart}
          setCart = {setCart} />)}
  </div>
}