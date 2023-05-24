import { FC } from "react";
import { Notification } from "@models/notifications";
import moment from "moment";
import "moment/locale/id"; // without this line it didn't work
import { AxiosClient, URL_NOTIFICATIONS } from "@constants/api";
import { error } from "console";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";

moment.locale("id");

export const NotificationCard: FC<Notification> = ({ id, title, body, date, isSeen, time, topic, url }) => {
  const router = useRouter();
  const onClick = async () => {
    const loading = toast.loading("loading...");
    AxiosClient.post(`${URL_NOTIFICATIONS}/${id}`)
      .then((response) => {
        router.push(url);
      })
      .catch((error) => {
        console.error(error);
      }).finally(()=>{
        toast.dismiss(loading)
      })
  };
  return (
    <div
      onClick={onClick}
      className={`reative mb-4 w-full cursor-pointer items-center justify-between rounded-md py-2 px-4 text-sm shadow-basic sm:text-base md:py-4 md:px-12 ${
        isSeen ? "" : "bg-[#dbeafe]"
      }`}
    >
      <div className="text-base font-semibold capitalize text-black sm:text-lg lg:text-xl">{title}</div>
      <div className="mt-1 mb-2 w-full border border-b-grey-dark" />
      <div className="text-gray-600">
        <div className="">{body}</div>
        <div className="mt-1 text-end text-xs italic sm:text-sm">{moment(date + ":" + time).fromNow()}</div>
      </div>
    </div>
  );
};
