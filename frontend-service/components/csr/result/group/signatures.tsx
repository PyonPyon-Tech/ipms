import { FC, useCallback, useEffect, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
import SignatureCanvas from "react-signature-canvas";
import styles from "./CsrSignature.module.css";
import { useAuth } from "@hooks/useAuth";
import { AxiosClient, URL_IMAGE } from "@constants/api";
import Axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { ST } from "next/dist/shared/lib/utils";

export const CsrResultSignatures: FC<{ data: String[], technicianName:String, picName:String }> = ({ data, technicianName, picName }) => {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      <div className="flex w-full flex-col items-center justify-center overflow-hidden">
        <h6 className="font-bold md:text-lg lg:text-[20px]">
          Tanda Tangan Teknisi
        </h6>
        <div className="relative">
          <div
            style={{ borderColor: "hsl(0, 0%, 80%)" }}
            className="my-2 flex h-20 w-full flex-col items-start justify-center rounded-md border-2 border-solid border-[rgba(0,0,0)] bg-gray-200 p-2"
          >
            <img
              className="h-full"
              src={`https://ipms-images.s3.ap-southeast-3.amazonaws.com/${data[0]}`}
            />
          </div>
        </div>
        <p className="font-bold md:text-lg lg:text-[16px]">
          {technicianName}
        </p>
      </div>

      <div className="flex w-full flex-col items-center justify-center overflow-hidden">
        <h6 className="font-bold md:text-lg lg:text-[20px]">
          Tanda Tangan PIC Outlet
        </h6>
        <div className="relative">
          <div
            style={{ borderColor: "hsl(0, 0%, 80%)" }}
            className="my-2 flex h-20 w-full flex-col items-start justify-center rounded-md border-2 border-solid border-[rgba(0,0,0)] bg-gray-200 p-2"
          >
            <img
              className="h-full"
              src={`https://ipms-images.s3.ap-southeast-3.amazonaws.com/${data[1]}`}
            />
          </div>
        </div>
        <p className="font-bold md:text-lg lg:text-[16px]">
          {picName}
        </p>
      </div>
    </div>
  );
};
