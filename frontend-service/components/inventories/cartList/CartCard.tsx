import { classNames } from "@functions/classNames";
import { Container } from "@components/general/Container";
import { Pesticide } from "@models/pestcontrol/Pesticide";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect, useState } from "react";
import { constants } from "buffer";

export const CartCard: FC<{ pesticide: Pesticide, cart: Map<number, number>, setCart: (cart: Map<number, number>,) => void }> = ({
  pesticide,
  cart,
  setCart
}) => {
  const [amount, setAmount] = useState<number>(0)
  useEffect(()=>{
    if(amount>=0){
      setCart(cart.set(pesticide.id, amount))
    }
  },[amount])
  return ({
  }
    
  );
};