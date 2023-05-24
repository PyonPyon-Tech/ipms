import { FC, useState } from "react";
import { NotificationCard } from "./card";
import { Notification } from "@models/notifications";
export const NotificationContainer: FC<{ data: Notification[] }> = ({ data }) => {
  const [category, setCategory] = useState<string[]>(["REPORT", "SCHEDULE", "COMPLAINT"]);
  const reportActive = category.includes("REPORT");
  const scheduleActive = category.includes("SCHEDULE");
  const complaintActive = category.includes("COMPLAINT");
  const toggleChip = (value: string) => {
    if (category.includes(value)) {
      setCategory(category.filter((x) => x != value));
    } else {
      setCategory(category.concat([value]));
    }
  };

  const reversedData = [...data].reverse();
  const filteredData = reversedData.filter((item) => !!category.find((val) => item.topic.includes(val)));
  return (
    <div className="mt-4 md:mt-6">
      <section id="kategoriNotifikasi" className="flex items-baseline gap-x-2 md:gap-x-4">
        <div className="text-sm font-medium sm:text-base">Kategori: </div>
        <div className="flex flex-wrap items-center gap-2 md:gap-4">
          <div
            onClick={() => toggleChip("REPORT")}
            className={`cursor-pointer rounded-3xl border-2 border-blue-light px-1.5 py-1 text-xs font-semibold sm:px-3 sm:text-sm ${
              reportActive ? " bg-blue text-white" : "border-blue-light text-blue"
            }`}
          >
            Laporan
          </div>
          <div
            onClick={() => toggleChip("SCHEDULE")}
            className={`cursor-pointer rounded-3xl border-2 border-teal-light px-1.5 py-1 text-xs font-semibold sm:px-3 sm:text-sm ${
              scheduleActive ? " bg-teal text-white" : "border-teal text-teal-dark"
            }`}
          >
            Jadwal
          </div>
          <div
            onClick={() => toggleChip("COMPLAINT")}
            className={`cursor-pointer rounded-3xl border-2 border-coral-light px-1.5 py-1 text-xs font-semibold sm:px-3 sm:text-sm ${
              complaintActive ? " bg-coral text-white" : "border-coral text-coral-dark"
            }`}
          >
            Komplain
          </div>
        </div>
      </section>
      <section id="listNotifikasi" className="mt-4">
        {filteredData.map((item) => {
          return <NotificationCard key={"notif" + item.id} {...item} />;
        })}
      </section>
    </div>
  );
};
