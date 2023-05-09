import { ComplaintForm } from "@components/complaints/ComplaintForm";
import { Title } from "@components/general/Title";
import { AxiosClient, URL_CUSTOMER } from "@constants/api";
import { ROLES } from "@constants/roles";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { useAuth } from "@hooks/useAuth";
import { CsrReport, CsrReportClass } from "@models/report/CsrReport";
import { AxiosError } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const AddCustomer: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [reports, setReports] = useState<CsrReport[]>([]);

  useEffect(() => {
    if (!user) return;
    if (ROLES[user?.role ?? 0] != "Customer") router.push(`/complaints`);

    async function retrieveReports() {
      AxiosClient.get(`${URL_CUSTOMER}/reports`)
        .then((response) => {
          setReports(response.data.map((x: any) => new CsrReportClass(x)));
          console.log(response.data);
        })
        .catch((err: AxiosError) => {
          toast.error(err.message);
          console.log(err);
        });
    }
    retrieveReports();
  }, [user, router]);

  return (
    <div className="mb-4 w-full md:pt-0">
      <section>
        <Title title="Ajukan Komplain" />
        {<ComplaintForm reports={reports} />}
      </section>
    </div>
  );
};
export default withAuth(withLayout(AddCustomer));
