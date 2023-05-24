import { FC, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "react-hot-toast";
import { useAuth } from "@hooks/useAuth";
import { AxiosError } from "axios";
import { AxiosClient, URL_IMAGE } from "@constants/api";

export const CsrResultAdditionalDetail: FC<{
  id: number;
  recommendations: string[];
  imageUrls: string[];
  type: "detailAreas" | "detailPests";
}> = ({ id, recommendations, type, imageUrls }) => {
  const { user } = useAuth();

  const [imageDatas, setImageDatas] = useState<String[]>();

  let arrString: String[] = [];

  useEffect(() => {
    if (!user) return;
    async function retrieveImageDatas(imageUrls: String[]) {
      let promises: Promise<any>[] = [];
      for (let i = 0; i < imageUrls.length; i++) {
        promises.push(AxiosClient.get(`${URL_IMAGE}/${imageUrls[i]}`));
      }
      await Promise.all(promises)
        .then((responses: any[]) => {
          console.log(responses);
          responses.map((response) => {
            console.log(response.data);
            arrString.push(response.data);
            setImageDatas(arrString);
            console.log(arrString);
          })
          // for (let response in responses) {
          //   console.log(response.data);
          // }
        })
        .catch((err: AxiosError) => {
          toast.error(err.message);
          console.log(err);
        });
    }
    retrieveImageDatas(imageUrls);
  }, [user]);
  console.log(imageDatas);
  imageDatas?.map((data)=>{
    arrString.push(data);
  })
  console.log(arrString);

  return recommendations.length != 0 ? (
    <div className="mb-2 w-0 min-w-full max-w-full">
      <div
        style={{ borderColor: "hsl(0, 0%, 80%)" }}
        className="my-2 flex w-full flex-row flex-wrap items-start justify-center gap-2 rounded-md border-2 border-solid border-[rgba(0,0,0)] bg-gray-200 p-2"
      >
        {arrString.length != 0 ? (
          arrString.map((item) => {
            return (
              <img className="max-h-48" src={`data:image/jpeg;base64, ${item}`}/>
            );
          })
        ) : (
          <h2>Tidak ada foto</h2>
        )}
      </div>
      <p className="mb-1 text-sm font-medium md:text-base lg:text-lg">Rekomendasi Tindakan:</p>
      <div
        style={{ borderColor: "hsl(0, 0%, 80%)" }}
        className="my-2 flex w-full flex-col items-center justify-center rounded-md border-2 border-solid border-[rgba(230,230,230)] p-2"
      >
        {recommendations.map((item) => {
          return (
            <div
              style={{ borderColor: "hsl(0, 0%, 80%)" }}
              className="my-2 flex w-full flex-col items-start justify-center rounded-md border-2 border-solid border-[rgba(0,0,0)] bg-gray-200 p-2"
            >
              <h2>{item}</h2>
            </div>
          );
        })}
      </div>
    </div>
  ) : (
    <div className="mb-2 w-0 min-w-full max-w-full">
      <div
        style={{ borderColor: "hsl(0, 0%, 80%)" }}
        className="my-2 flex w-full flex-row flex-wrap items-start justify-center gap-2 rounded-md border-2 border-solid border-[rgba(0,0,0)] bg-gray-200 p-2"
      >
        {imageUrls.length != 0 ? (
          imageUrls.map((item) => {
            return (
              <img className="max-h-48" src={`data:image/jpeg;base64, ${item}`}/>
            );
          })
        ) : (
          <h2>Tidak ada foto</h2>
        )}
      </div>
      <p className="mb-1 text-sm font-medium md:text-base lg:text-lg">Rekomendasi Tindakan:</p>
      <div
        style={{ borderColor: "hsl(0, 0%, 80%)" }}
        className="my-2 flex w-full flex-col items-center justify-center rounded-md border-2 border-solid border-[rgba(0,0,0)] p-2"
      >
        <h2>Tidak ada rekomendasi tindakan aaa.</h2>
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
