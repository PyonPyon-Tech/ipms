import { ComplaintDetail } from "@components/complaints/ComplaintDetail";
import { Title } from "@components/general/Title";
import { AxiosClient, URL_CUSTOMER } from "@constants/api";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { useAuth } from "@hooks/useAuth";
import { ComplaintClass } from "@models/customer/complaint";
import { Complaint } from "@models/customer/complaint";
import { AxiosError } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ComplaintDetailPage: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [complaint, setComplaint] = useState<Complaint>();

  useEffect(() => {
    if (!user) return;
    if (!router.query.id) return;
    async function retrieveComplaint() {
      AxiosClient.get(`${URL_CUSTOMER}/complaints/${router.query.id}`)
        .then((response) => {
          let complaintObj = new ComplaintClass(response.data);
          setComplaint(complaintObj);
          console.log(response.data);
        })
        .catch((err: AxiosError) => {
          toast.error(err.message);
          console.log(err);
        });
    }
    retrieveComplaint();
  }, [user, router]);

  return(
    <div className="w-full">
    <section>
      <Title
        title="Detail Komplain"
      />
    </section>

    {!!complaint && <ComplaintDetail {...complaint} />}

  </div>

  )
};
export default withAuth(withLayout(ComplaintDetailPage));
