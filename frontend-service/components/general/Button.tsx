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
  let submit: any = "";
  if (action?.submit == true) {
    submit = submit;
  }
  return (
    <div className="flex items-center justify-between">
      {img == null && action.name != null && (
        <button
          onClick={action.func}
          className={`cursor-pointer rounded-md bg-blue py-2 px-3 text-xs font-bold text-white md:py-2 md:px-3 md:text-sm ${className}`}
          type={submit}
        >
          <p>{action.name}</p>
        </button>
      )}
      {img != null && action.name != null && (
        <button
          onClick={action.func}
          className={`flex cursor-pointer items-center gap-2 rounded-md bg-blue py-2 px-3 text-xs font-bold text-white md:py-2 md:px-3 md:text-sm ${className}`}
          type={submit}
        >
          <p>{action.name}</p>
          <img style={{ width: "16px" }} src={img} />
        </button>
      )}
      {img != null && action.name == null && (
        <button
          onClick={action.func}
          className={`flex cursor-pointer items-center rounded-md bg-blue py-2 px-3 text-xs font-bold text-white md:py-2 md:px-3 md:text-sm ${className}`}
          type={submit}
        >
          <img style={{ width: "16px" }} src={img} />
        </button>
      )}
    </div>
  );
};
