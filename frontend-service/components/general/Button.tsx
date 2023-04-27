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
    <div className="flex items-center">
      <button
        onClick={action.func}
        className={`hover:bg-opacity-70 hover:bg- cursor-pointer rounded-md bg-blue py-2 px-3 text-xs font-semibold text-white md:text-base flex flex-row gap-2 justify-center ${className}`}
        type={!action.submit ? "button" : "submit"}
      >
        {action.name ? <p>{action.name}</p> : <></>}
        {img ? <img style={{ width: "16px" }} src={img} /> : <></>}
      </button>
    </div>
  );
};