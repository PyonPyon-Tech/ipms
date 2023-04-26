import { FC, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FileRejection, useDropzone } from "react-dropzone";
import toast from "react-hot-toast";

export const CsrResultVisitationPhoto: FC<{ data: String }> = ({ data }) => {
  console.log(data);
  return (
    <div className="my-8 flex w-0 min-w-full flex-col items-center">
      <p className="font-bold md:text-lg lg:text-[20px]">Foto Kunjungan</p>
      <div
        style={{ borderColor: "hsl(0, 0%, 80%)" }}
        className={`my-2 flex w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-solid border-[rgba(230,230,230)] bg-gray-200 p-4`}
      >
        <img
          className="h-40"
          src={`https://ipms-images.s3.ap-southeast-3.amazonaws.com/${data}`}
        />
      </div>
    </div>
  );
};
