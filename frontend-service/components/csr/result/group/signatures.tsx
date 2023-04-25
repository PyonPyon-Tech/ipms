import { FC, useCallback, useRef } from "react";
import { useFormContext } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";
import styles from "./CsrSignature.module.css";

export const CsrResultSignatures: FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="flex w-full flex-col items-center justify-center overflow-hidden">
        <h6 className="font-bold md:text-lg lg:text-[20px]">Tanda Tangan Teknisi</h6>
        <div className="relative">
        <div
                style={{ borderColor: "hsl(0, 0%, 80%)" }}
                className="my-2 flex w-full h-20 flex-col items-start justify-center rounded-md border-2 border-solid border-[rgba(0,0,0)] bg-gray-200 p-2">
                <h2>placeholder tanda tangan</h2>
        </div>
        </div>
      </div>

      <div className="flex w-full flex-col items-center justify-center overflow-hidden">
        <h6 className="font-bold md:text-lg lg:text-[20px]">Tanda Tangan PIC Outlet</h6>
        <div className="relative">
        <div
                style={{ borderColor: "hsl(0, 0%, 80%)" }}
                className="my-2 flex h-20 w-full flex-col items-start justify-center rounded-md border-2 border-solid border-[rgba(0,0,0)] bg-gray-200 p-2">
                <h2>placeholder tanda tangan</h2>
        </div>
        </div>
      </div>
    </div>
  );
};
