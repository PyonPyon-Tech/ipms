import { classNames } from "@functions/classNames";
import { Container } from "@components/general/Container";
import { Pesticide } from "@models/pestcontrol/Pesticide";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect, useState } from "react";
import { constants } from "buffer";

export const PesticideCard: FC<{ pesticide: Pesticide, cart: Map<number, number>, setCart: (cart: Map<number, number>,) => void }> = ({
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
  return (
    <div
      style={{ boxShadow: " 0px 0px 5px 0px rgba(197, 197, 197, 1)" }}
      className="flex rounded-[10px] p-4 align-middle justify-between mt-4 flex-wrap"
    >
      <div>
        <div className="pb-1 text-xl text font-bold text max-lg:text-center">
          <h5>{pesticide.name}</h5>
        </div>
        <table className="table-auto font-medium text-xs md:text-sm">
          <tbody>
            <tr>
              <td className="pr-4">Bahan aktif: {pesticide.activeIngredient}</td>
              <td className="hidden md:table-cell">Stock: {pesticide.stock}</td>
            </tr>
          </tbody>
        </table>
      </div>
      { amount < 1 ?
        (<button className={`text-xs md:text-base font-semibold py-1 text-white rounded-md text-center px-3 bg-teal`}
          onClick={() => {
            setAmount(amount + 1)
            console.log(cart);
          }}>
          Tambah
        </button>)
        :
        (<div className="flex gap-2 items-center max-lg:mx-auto max-lg:pt-2">
          <div className="flex h-6 w-6 items-center justify-center rounded bg-teal-dark">
          <button className={`text-xs md:text-base font-semibold py-1 text-white rounded-md text-center px-3 bg-orange`}
          onClick={() => {
            setAmount(amount-1)
            
            console.log(cart);
          }}>
            -
          </button>
          </div>
          <div>
            <h5 className="text-xl font-bold">{amount}</h5>
          </div>
          <button className={`text-xs md:text-base font-semibold py-1 text-white rounded-md text-center px-3 bg-teal`}
          onClick={() => {
            setCart(cart.set(pesticide.id,amount+1))
            setAmount(amount+1)
            console.log(cart);
          }}>
            +
          </button>
        </div>)
      }
    </div>
  );
};