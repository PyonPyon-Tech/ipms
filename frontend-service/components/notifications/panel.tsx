import { AxiosClient, URL_NOTIFICATIONS } from "@constants/api";
import { Notification } from "@models/notifications";
import { useRouter } from "next/router";
import { FC } from "react";
import toast from "react-hot-toast";

export const NotificationPanel: FC<{ data: Notification[]; onClose: any }> = ({ data, onClose }) => {
  const router = useRouter();
  const readAll = async () => {
    AxiosClient.post(`${URL_NOTIFICATIONS}/all`)
      .then((response) => {
        router.reload();
      })
      .catch((error) => {
        console.log(error);
        toast.error("Terdapat masalah");
      });
  };
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className="absolute right-0 top-[40px] shadow-lg w-96 cursor-default rounded-md bg-white text-black"
    >
      <div className="flex p-4 py-3 shadow-md">
        <h2 className="grow">Notifikasi</h2>
        <svg
          onClick={onClose}
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6 cursor-pointer"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>
      <div className="max-h-60 overflow-y-auto px-4 pt-2">
        {data.map((item) => {
          return <PanelNotificationCard key={"notif" + item.id} {...item} />;
        })}
        {data.length == 0 && <PanelEmpty />}
      </div>
      <div
        style={{ boxShadow: "0 -2px 4px -2px rgb(0 0 0 / 0.25)" }}
        className="flex justify-between p-4 pt-2 text-sm font-normal text-blue"
      >
        {data.length > 0 && (
          <h6 onClick={readAll} className="cursor-pointer hover:underline">
            Tandai semua dibaca
          </h6>
        )}
        <h6 onClick={() => router.push("/notifications")} className="cursor-pointer hover:underline">
          Lihat Selengkapnya
        </h6>
      </div>
    </div>
  );
};

const PanelNotificationCard: FC<Notification> = ({ id, title, time, body, url }) => {
  const router = useRouter();
  const onClick = async () => {
    const loading = toast.loading("loading...");
    AxiosClient.post(`${URL_NOTIFICATIONS}/${id}`)
      .then((response) => {
        router.push(url);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        toast.dismiss(loading);
      });
  };
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="mt-2 border-b border-b-grey-dark pb-1"
    >
      <h2 className="text-sm font-medium">{title}</h2>
      <p className="my-1 text-xs font-normal">{body}</p>
    </div>
  );
};

const PanelEmpty = () => {
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="rgb(51,144,130)" className="h-7 w-7">
        <path
          fillRule="evenodd"
          d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
          clipRule="evenodd"
        />
      </svg>
      <div className="font-semibold text-teal-dark">Belum Ada Notifikasi Baru</div>
    </div>
  );
};
