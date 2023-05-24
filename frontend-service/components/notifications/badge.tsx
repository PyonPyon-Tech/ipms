import { AxiosClient, URL_NOTIFICATIONS } from "@constants/api";
import { useAuth } from "@hooks/useAuth";
import { Notification } from "@models/notifications";
import { FC, useEffect, useState } from "react";
import { NotificationPanel } from "./panel";

export const NotificationBellBadge: FC = () => {
  const [data, setdata] = useState<Notification[]>([]);
  const [panel, setPanel] = useState<Boolean>(false);
  const { user } = useAuth();
  useEffect(() => {
    if (!user) return;
    AxiosClient.get(`${URL_NOTIFICATIONS}/unread`)
      .then((response) => {
        setdata(response.data);
      })
      .catch((error) => console.error(error));
  }, [user]);
  const unreadNotifications = data.length > 0;
  return (
    <div
      onClick={() => setPanel(!panel)}
      className={`relative hidden cursor-pointer items-center gap-x-2 rounded-3xl p-1 md:flex`}
    >
      {unreadNotifications && (
        <div className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full  bg-coral-dark text-xs text-white">
          {data.length}
        </div>
      )}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="rgb(255,255,255)"
        className="h-7 w-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
        />
      </svg>
      {panel && <NotificationPanel onClose={() => setPanel(false)} data={data} />}
    </div>
  );
};

export const NotificationBadge: FC<{ className?: string }> = ({ className }) => {
  const [count, setCount] = useState(0);
  const { user } = useAuth();
  useEffect(() => {
    if (!user) return;
    AxiosClient.get(`${URL_NOTIFICATIONS}/unread`)
      .then((response) => {
        setCount(response.data.length);
      })
      .catch((error) => console.error(error));
  }, [user]);
  return (
    <div className={`absolute top-1/2 right-4 z-50 flex -translate-y-1/2 items-center ${className}`}>
      {count > 0 && (
        <div className="z-50 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[8px] font-bold text-white md:h-5 md:w-5 md:text-xs">
          {count}
        </div>
      )}
    </div>
  );
};
