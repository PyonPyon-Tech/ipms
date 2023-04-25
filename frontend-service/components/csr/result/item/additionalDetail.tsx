import { FC, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";

export const CsrResultAdditionalDetail: FC<{
  id: number;
  recommendations: string[];
  type: "detailAreas" | "detailPests";
}> = ({ id, recommendations, type }) => {
  return recommendations.length != 0? (
      <div className="mb-2 w-0 min-w-full max-w-full">
        <div
                style={{ borderColor: "hsl(0, 0%, 80%)" }}
                className="my-2 flex w-full flex-col items-start justify-center rounded-md border-2 border-solid border-[rgba(0,0,0)] bg-gray-200 p-2">
                <h2>placeholder foto</h2>
        </div>
        <p className="mb-1 text-sm font-medium md:text-base lg:text-lg">Rekomendasi Tindakan:</p>
        <div
              style={{ borderColor: "hsl(0, 0%, 80%)" }}
              className="my-2 flex w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-solid border-[rgba(230,230,230)] p-2">
          
          {recommendations.map((item) => {
              return (
                <div
                style={{ borderColor: "hsl(0, 0%, 80%)" }}
                className="my-2 flex w-full flex-col items-start justify-center rounded-md border-2 border-solid border-[rgba(0,0,0)] bg-gray-200 p-2">
                <h2>{item}</h2>
                </div>
              );
          })}
        </div>
      </div>
  ): (
    <div className="mb-2 w-0 min-w-full max-w-full">
        <div
                style={{ borderColor: "hsl(0, 0%, 80%)" }}
                className="my-2 flex w-full flex-col items-start justify-center rounded-md border-2 border-solid border-[rgba(0,0,0)] bg-gray-200 p-2">
                <h2>placeholder foto</h2>
        </div>
        <p className="mb-1 text-sm font-medium md:text-base lg:text-lg">Rekomendasi Tindakan:</p>
        <div
              style={{ borderColor: "hsl(0, 0%, 80%)" }}
              className="my-2 flex w-full flex-col items-start justify-center rounded-md border-2 border-solid border-[rgba(0,0,0)] p-2">
          <h2>Tidak ada rekomendasi tindakan.</h2>
        </div>
      </div>
  );
};

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};
