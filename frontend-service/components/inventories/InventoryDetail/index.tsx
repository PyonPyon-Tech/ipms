import { Pesticide } from "@models/pestcontrol/Pesticide";
import { FC } from "react";

export const InventoryDetail: FC<{
  data: Pesticide;
  children?: React.ReactNode;
}> = ({
  data: { id, name, activeIngredient, stock, targets, unit, targetPests },
  children,
}) => {
  return (
    <div className="mt-4 flex w-0 min-w-full flex-col gap-2 rounded-md p-4 align-middle shadow-basic">
      <div className="flex gap-2">
        <h1 className="text-2xl font-bold">{name}</h1>
      </div>
      <div className="flex flex-row">
        <div className="flex w-1/2 flex-col">
          <h5 className="text-base font-bold">Bahan Aktif</h5>
          <p className="pb-1 text-base">{activeIngredient}</p>
          <h5 className="font-bold">Unit</h5>
          <p className="pb-1 text-base">{unit}</p>
          {/* <h5 className="font-bold">Target Pest</h5>
          <ul className="list-disc pl-6">
            {targetPests?.map((targetPest) => (
              <li className="text-base">{targetPest.name}</li>
            ))}
          </ul> */}
        </div>
        <div className="w-1/2 flex-col">
          <h5 className="font-bold">Target Chemical</h5>
          <ul className="list-disc pl-6">
            {targets?.split(",").map((x, idx) => {
              return <li key={"li" + idx}>{x}</li>;
            })}
          </ul>
        </div>
      </div>
      {children}
    </div>
  );
};

export const InventoryDetailStock: FC<Pesticide> = ({ stock }) => {
  return (
    <div className="my-2 flex flex-col justify-center gap-2 rounded-md bg-blue-light p-4 align-middle">
      <h5 className="text-center text-base font-bold">Stok Sekarang</h5>
      <p className="pb-1 text-center text-base">{stock}</p>
    </div>
  );
};
