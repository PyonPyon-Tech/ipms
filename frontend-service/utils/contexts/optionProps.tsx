import { ComponentType } from "react";
import { GroupBase, OptionProps } from "react-select";

export const MyOption: ComponentType<
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