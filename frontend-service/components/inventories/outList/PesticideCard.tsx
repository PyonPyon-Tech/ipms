import { Pesticide } from "@models/pestcontrol/Pesticide";
import { FC, useEffect, useState } from "react";
import { Button } from "@components/general/Button";

export const PesticideCard: FC<{
    pesticide: Pesticide;
    isCart: boolean;
    cart: Map<number, number>;
    setCart: (cart: Map<number, number>) => void;
}> = ({ pesticide, isCart, cart, setCart }) => {
    const [amount, setAmount] = useState<number>(0);
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
                            style={{
                                boxShadow:
                                    " 0px 0px 5px 0px rgba(197, 197, 197, 1)",
                            }}
                            className="mt-4 flex flex-wrap justify-between rounded-[10px] p-4 align-middle"
                        >
                            <div>
                                <div className="text text pb-1 text-xl font-bold max-lg:text-center">
                                    <h5>{pesticide.name}</h5>
                                </div>
                                <table className="table-auto text-xs font-medium md:text-sm">
                                    <tbody>
                                        <tr>
                                            <td className="pr-4">
                                                Bahan aktif:{" "}
                                                {pesticide.activeIngredient}
                                            </td>
                                            <td className="hidden md:table-cell">
                                                Stock: {pesticide.stock}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            {amount < 1 ? (
                                <Button
                                    className="bg-blue"
                                    action={{
                                        name: "Tambah",
                                        func: () => {
                                            setAmount(amount + 1);
                                            console.log(cart);
                                        },
                                    }}
                                ></Button>
                            ) : (
                                <div className="flex items-center gap-2 max-lg:mx-auto max-lg:pt-2">
                                    <div className="flex h-6 w-6 items-center justify-center rounded bg-teal-dark">
                                        <Button
                                            className="bg-orange font-bold"
                                            action={{
                                                name: "-",
                                                func: () => {
                                                    setAmount(amount - 1);
                                                    console.log(cart);
                                                },
                                            }}
                                        ></Button>
                                    </div>
                                    <div>
                                        <h5 className="text-xl font-bold">
                                            {amount}
                                        </h5>
                                    </div>
                                    <Button
                                        className="bg-teal font-bold"
                                        action={{
                                            name: "+",
                                            func: () => {
                                                if (amount < pesticide.stock) {
                                                    setCart(
                                                        cart.set(
                                                            pesticide.id,
                                                            amount + 1
                                                        )
                                                    );
                                                    setAmount(amount + 1);
                                                }
                                            },
                                        }}
                                    ></Button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div></div>
                    )}
                </div>
            ) : (
                <div
                    style={{
                        boxShadow: " 0px 0px 5px 0px rgba(197, 197, 197, 1)",
                    }}
                    className="mt-4 flex flex-wrap justify-between rounded-[10px] p-4 align-middle"
                >
                    <div>
                        <div className="text text pb-1 text-xl font-bold max-lg:text-center">
                            <h5>{pesticide.name}</h5>
                        </div>
                        <table className="table-auto text-xs font-medium md:text-sm">
                            <tbody>
                                <tr>
                                    <td className="pr-4">
                                        Bahan aktif:{" "}
                                        {pesticide.activeIngredient}
                                    </td>
                                    <td className="hidden md:table-cell">
                                        Stock: {pesticide.stock}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {amount < 1 ? (
                        <Button
                            className="bg-teal "
                            action={{
                                name: "Tambah",
                                func: () => {
                                    setAmount(amount + 1);
                                    console.log(cart);
                                },
                            }}
                        ></Button>
                    ) : (
                        <div className="flex items-center gap-2 max-lg:mx-auto max-lg:pt-2">
                            <div className="flex h-6 w-6 items-center justify-center rounded bg-teal-dark">
                                <Button
                                    className="bg-orange font-bold"
                                    action={{
                                        name: "-",
                                        func: () => {
                                            setAmount(amount - 1);
                                            console.log(cart);
                                        },
                                    }}
                                ></Button>
                            </div>
                            <div>
                                <h5 className="text-xl font-bold">{amount}</h5>
                            </div>
                            <Button
                                className="bg-teal font-bold"
                                action={{
                                    name: "+",
                                    func: () => {
                                      setCart(cart.set(pesticide.id, amount + 1));
                                      setAmount(amount + 1);
                                      console.log(cart);
                                  },
                                }}
                            ></Button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};
