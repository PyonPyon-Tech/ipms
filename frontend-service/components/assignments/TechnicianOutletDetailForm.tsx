import { Outlet } from "@models/customer/outlet";
import {
  ComponentType,
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { toast } from "react-hot-toast";
import Select, { GroupBase, OptionProps } from "react-select";
export const TechnicianOutletsDetailForm: FC<{
  before: Outlet[];
  allOutlets: Outlet[];
  setSaved: Dispatch<SetStateAction<Outlet[]>>;
}> = ({ before, allOutlets, setSaved }) => {
  const [outlets, setOutlets] = useState<Outlet[]>([]);
  const [selected, setSelected] = useState<Outlet>();
  useEffect(() => {
    if (before.length == 0) return;
    setOutlets(before);
  }, [before]);
  const filterOutById = (id: number): Outlet[] =>
    outlets.filter((outlet) => outlet.id != id);

  const selectOutlet = (e: any) => {
    setSelected(allOutlets.find((outlet) => outlet.id == e.value) as Outlet);
  };

  return (
    <div className="w-full">
      <table className="w-full table-auto text-left">
        <thead>
          <tr className="text-sm font-semibold md:text-base">
            <th className="w-[45%] pb-2 md:w-4/12">Nama Outlet</th>
            <th className="w-[45%] pb-2 md:w-6/12">Alamat</th>
            <th className="w-[10%] pb-2 md:w-1/6">Action</th>
          </tr>
        </thead>
        <tbody className="text-xs md:text-sm">
          {outlets.map((outlet) => {
            return (
              <tr key={outlet.name + "k"}>
                <td className="py-1.5 font-medium">{outlet.name}</td>
                <td className="py-1.5">{outlet.address}</td>
                <td>
                  <img
                    onClick={() => {
                      const x = filterOutById(outlet.id);
                      setSaved(x);
                      setOutlets(x);
                    }}
                    className="w-10 cursor-pointer"
                    src="/icons/trash.jpeg"
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="mt-6 flex items-center gap-x-4 text-sm md:gap-x-8">
        <div className="w-1/2 sm:w-3/4 lg:w-4/5">
          <Select
            onChange={selectOutlet}
            options={allOutlets.map((outlet) => {
              return {
                value: outlet.id,
                label: outlet.name,
                address: outlet.address,
              };
            })}
            components={{ Option: MyOption }}
          />
        </div>
        <div
          onClick={() => {
            if (outlets.findIndex((outlet) => outlet.id == selected?.id) >= 0) {
              toast.error("Sudah ditambahkan");
            } else if (!!selected) {
              const x = outlets.concat([selected]);
              setSaved(x);
              setOutlets(x);
            }
          }}
          className="cursor-pointer rounded-md border-2 border-blue bg-blue px-2 py-1 text-center text-white"
        >
          Tambah Outlet
        </div>{" "}
      </div>
    </div>
  );
};
const MyOption: ComponentType<
  OptionProps<
    {
      value: number;
      label: string;
    },
    false,
    GroupBase<{
      value: number;
      label: string;
    }>
  >
> = (props) => {
  const { innerProps, innerRef } = props;
  return (
    <div
      ref={innerRef}
      {...innerProps}
      className={`cursor-pointer px-2 pt-1 hover:bg-[#dbeafe] ${
        props.isSelected ? "bg-blue text-white hover:bg-blue" : ""
      }`}
    >
      <h4 className="font-semibold">{props.data.label}</h4>
      <p
        className={`mt-1 pb-2 text-xs ${
          props.isSelected ? "" : "border-b border-blue-light"
        }`}
      >
        {props.data.address}
      </p>
    </div>
  );
};
