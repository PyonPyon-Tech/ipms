import { Pesticide } from "@models/pestcontrol/Pesticide";
import { FC, useEffect, useState } from "react";
import { Button } from "@components/general/Button";
import { ButtonOut } from "@components/inventories/outList/ButtonOut";
import toast from "react-hot-toast";

export const PesticideCard: FC<{
    pesticide: Pesticide;
    isCart: boolean;
    cart: Map<number, number>;
    setCart: (cart: Map<number, number>) => void;
}> = ({ pesticide, isCart, cart, setCart }) => {
    const [amount, setAmount] = useState<number>(0);

    function plusAmount(){
        if (amount < pesticide.stock){
            setCart(cart.set(pesticide.id, amount+1))
            setAmount(amount + 1)
        }else{
            toast.error("Stock tidak mencukupi");
        }
        console.log(cart)
    }
    function minusAmount(){
        setCart(cart.set(pesticide.id, amount-1))
        setAmount(amount - 1)
        console.log(cart)
    }

    useEffect(() => {
        if (amount >= 0) {
            setCart(cart.set(pesticide.id, amount));
        }
    }, [amount]);
    return (
        <div>
            {isCart ? (
                <div>
                    {amount > 0 ? (
                        <div
                        className="shadow-basic mt-4 flex justify-between rounded-[10px] p-4 align-middle"
                    >
                        <div className="w-8/12 lg:w-4/5">
                            <div className="text text pb-1 text-xl font-bold">
                                <h5>{pesticide.name}</h5>
                            </div>
                            <table className="table-auto text-xs font-medium w-full md:text-sm">
                                <tbody>
                                    <tr className="flex justify-between">
                                        <td className="w-3/4 md:w-2/4 lg:w-2/3 pr-4">
                                            Bahan aktif:{" "}
                                            {pesticide.activeIngredient}
                                        </td>
                                        <td className="w-1/4 md:2/4 lg:w-1/3 table-cell">
                                            Stock: {pesticide.stock}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="flex items-center justify-between gap-2 max-lg:mx-auto max-lg:pt-2 md:w-3/12 lg:w-1/5 xl:w-2/12">
                            <ButtonOut
                                className="bg-orange font-bold"
                                action={{
                                    name: "-",
                                    func: () => {
                                        minusAmount()
                                    },
                                }}
                            ></ButtonOut>
                            <div>
                                <h5 className="text-xl font-bold">{amount}</h5>
                            </div>
                            <ButtonOut
                                className="bg-teal font-bold"
                                action={{
                                    name: "+",
                                    func: () => {
                                        plusAmount()
                                    },
                                }}
                            ></ButtonOut>
                        </div>
                    </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            ) : (
                <div
                    className="shadow-basic mt-4 flex justify-between rounded-[10px] p-4 align-middle"
                >
                    <div className="w-8/12 lg:w-4/5">
                        <div className="text text pb-1 text-xl font-bold">
                            <h5>{pesticide.name}</h5>
                        </div>
                        <table className="table-auto text-xs font-medium w-full md:text-sm">
                            <tbody>
                                <tr className="flex justify-between">
                                    <td className="w-3/4 md:w-2/4 lg:w-2/3 pr-4">
                                        Bahan aktif:{" "}
                                        {pesticide.activeIngredient}
                                    </td>
                                    <td className="w-1/4 md:2/4 lg:w-1/3 table-cell">
                                        Stock: {pesticide.stock}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {amount < 1 ? (
                        <ButtonOut
                            className="bg-teal "
                            action={{
                                name: "Tambah",
                                func: () => {
                                    plusAmount()
                                },
                            }}
                        ></ButtonOut>
                    ) : (
                        <div className="flex items-center justify-between gap-2 max-lg:mx-auto max-lg:pt-2 md:w-3/12 lg:w-1/5 xl:w-2/12">
                            <ButtonOut
                                className="bg-orange font-bold"
                                action={{
                                    name: "-",
                                    func: () => {
                                        minusAmount()
                                    },
                                }}
                            ></ButtonOut>
                            <div>
                                <h5 className="text-xl font-bold">{amount}</h5>
                            </div>
                            <ButtonOut
                                className="bg-teal font-bold"
                                action={{
                                    name: "+",
                                    func: () => {
                                      plusAmount()
                                  },
                                }}
                            ></ButtonOut>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
