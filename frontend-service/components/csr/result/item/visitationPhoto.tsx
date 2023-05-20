import { FC, useEffect, useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { FileRejection, useDropzone } from "react-dropzone";
import toast from "react-hot-toast";
import { AxiosClient, URL_IMAGE } from "@constants/api";
import { AxiosError } from "axios";
import { useAuth } from "@hooks/useAuth";

export const CsrResultVisitationPhoto: FC<{ data: String }> = ({ data }) => {
  console.log(data);

  const { user } = useAuth();

  const [imageDatas, setImageDatas] = useState<String[]>();

  let arrString: String[] = [];

  useEffect(() => {
    if (!user) return;
    async function retrieveImageDatas(imageUrls: String) {
      let promises: Promise<any>[] = [];
      promises.push(AxiosClient.get(`${URL_IMAGE}/${imageUrls}`));
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
    retrieveImageDatas(data);
  }, [user]);
  console.log(imageDatas);
  imageDatas?.map((item)=>{
    arrString.push(item);
  })
  console.log(arrString);
  return (
    <div className="my-8 flex w-0 min-w-full flex-col items-center">
      <p className="font-bold md:text-lg lg:text-[20px]">Foto Kunjungan</p>
      <div
        style={{ borderColor: "hsl(0, 0%, 80%)" }}
        className={`my-2 flex w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-solid border-[rgba(230,230,230)] bg-gray-200 p-4`}
      >
        <img src={`data:image/jpeg;base64, ${arrString[0]}`}/>
      </div>
    </div>
  );
};
