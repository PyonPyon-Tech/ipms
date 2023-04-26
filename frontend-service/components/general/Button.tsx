import { FC } from "react";

export const Button: FC<{
  className?: string;
  action: {
    name?: string;
    submit?: boolean;
    func?: () => void;
  };
  img?: string;
}> = ({ action, className, img }) => {
  return (
    <div className="flex items-center justify-between">
      <button
        onClick={action.func}
        className={`cursor-pointer rounded-md bg-blue py-2 px-3 text-xs font-semibold text-white md:py-2 md:px-3 md:text-sm ${className}`}
        type={!action.submit ? "button" : "submit"}
      >
        {action.name ? <p>{action.name}</p> : <></>}
        {img ? <img style={{ width: "16px" }} src={img} /> : <></>}
      </button>
    </div>
  );
};