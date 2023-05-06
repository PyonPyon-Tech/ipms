import { Loading } from "@components/general/Loading";
import { Title } from "@components/general/Title";
import { NotificationContainer } from "@components/notifications/container";
import { NotificationHead } from "@components/notifications/head";
import { AxiosClient, URL_NOTIFICATIONS } from "@constants/api";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { useAuth } from "@hooks/useAuth";
import { AxiosError } from "axios";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Notification } from "@models/notifications";
const dayInMilisec = 1000 * 60 * 60 * 24;
const today = new Date();
const yesterday = new Date(today.getTime() - dayInMilisec);

const NotificationPage: NextPage = () => {
  const [data, setData] = useState<Notification[] | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!!data || !user) return;
    onChangeFilter(0);
  }, [user, data]);

  const onChangeFilter = async (day: any) => {
    const today = new Date();
    const end = today.toISOString().split("T")[0];
    const start = new Date(today.getTime() - dayInMilisec * Number(day)).toISOString().split("T")[0];
    AxiosClient.get(`${URL_NOTIFICATIONS}?start=${start}&end=${end}`)
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((err: AxiosError) => {
        console.error(err);
        toast.error(err.message);
      });
    // panggi api dan set data
  };

  return (
    <div className="w-full">
      <section>
        <Title title="Notifikasi" />
      </section>
      <section>
        <NotificationHead setData={onChangeFilter} />
        {data == null ? <Loading /> : <NotificationContainer data={data} />}
      </section>
    </div>
  );
};

export default withAuth(withLayout(NotificationPage));
