import { ComplaintForm } from "@components/complaints/ComplaintForm";
import { Title } from "@components/general/Title";
import { AxiosClient, URL_CUSTOMER } from "@constants/api";
import { ROLES } from "@constants/roles";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { useAuth } from "@hooks/useAuth";
import { Outlet, OutletClass } from "@models/customer/outlet";
import { CsrReport, CsrReportClass } from "@models/report/CsrReport";
import { AxiosError } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddComplaint: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [reports, setReports] = useState<CsrReport[]>([]);
  const [outlets, setOutlets] = useState<Outlet[]>([]);

  useEffect(() => {
    if (!user) return;
    if (ROLES[user?.role ?? 0] != "Customer") { 
      router.push(`/complaints`);
      toast.error(`Hanya customer yang dapat membuat komplain`);
      return;
    }

    async function retrieveOutlets() {
        AxiosClient.get(`${URL_CUSTOMER}/outlets`)
        .then((response) => {
          setOutlets(response.data.map((x: any) => new OutletClass(x)));
          console.log(response.data);
        })
        .catch((err: AxiosError) => {
          toast.error(err.message);
          console.log(err);
        });
      }
    
    retrieveOutlets();
  }, [user, router]);

  return (
    <div className="mb-4 w-full md:pt-0">
      <section>
        <Title title="Ajukan Komplain" />
        <ComplaintForm outlets={outlets} />
      </section>
    </div>
  );
};
export default withAuth(withLayout(AddComplaint));
