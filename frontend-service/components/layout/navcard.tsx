import { NotificationBadge } from "@components/notifications/badge";
import { NavigationCardProps } from "@type/navigationCardProps";
import { useRouter } from "next/router";
import { FC } from "react";

export const NavigationCard: FC<NavigationCardProps> = ({ path, name }) => {
  const router = useRouter();
  const isNotification = name === "Notifikasi";
  return (
    <div
      onClick={() => router.push(path)}
      className={`duration-50 relative flex cursor-pointer gap-x-2 bg-white py-4 pl-10 text-xs font-semibold text-blue ease-in-out hover:brightness-90 md:text-base ${isNotification && "md:hidden"}`}
    >
      <h4>{name}</h4>
      {isNotification && <NotificationBadge />}
    </div>
  );
};
