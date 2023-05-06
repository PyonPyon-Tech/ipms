import { Button } from "@components/general/Button";
import { AxiosClient, URL_NOTIFICATIONS } from "@constants/api";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import { toast } from "react-hot-toast";

export const NotificationHead: FC<{ setData: any }> = ({ setData }) => {
  const router = useRouter()
  const onClick = async ()=>{
    AxiosClient.post(`${URL_NOTIFICATIONS}/all`).then(response =>{
      router.reload()
    }).catch(error =>{
      console.log(error)
      toast.error("Terdapat masalah")
    })
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2">
      <form className="flex items-center gap-x-4 text-sm font-medium sm:text-xl">
        <label htmlFor="dari" className="text-sm font-medium sm:text-xl">
          Dari:{" "}
        </label>
        <select defaultValue={"0"} className="px-4 py-1 text-xs font-normal sm:text-sm" onChange={e=>setData(e.target.value)}>
          <option value="0">Hari Ini</option>
          <option value="1">Kemarin</option>
          <option value="7">Minggu Ini</option>
          <option value="30">1 Bulan Lalu</option>
          <option value="365">1 Tahun Lalu</option>
        </select>
        <Button
          className="items-center gap-x-4 text-[10px] sm:hidden"
          action={{
            name: "Baca Semua",
            submit: false,
            func: onClick
          }}
        />
      </form>
      <div className="flex sm:justify-end">
        <Button
          className="hidden items-center gap-x-4 sm:flex  md:text-sm lg:text-base"
          action={{
            name: "Tandai Baca Semua",
            func: onClick
          }}
          img="/icons/eye.svg"
        />
      </div>
    </div>
  );
};
