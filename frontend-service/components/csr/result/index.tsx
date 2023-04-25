import { CsrReportDetail } from "@components/csr/result/ResultDetail";
import { Title } from "@components/general/Title";
import { AxiosClient, URL_CUSTOMER, URL_REPORT } from "@constants/api";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { useAuth } from "@hooks/useAuth";
import { Customer, CustomerClass } from "@models/customer/customer";
import { CsrReport, CsrReportClass } from "@models/report/CsrReport";
import { AxiosError } from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CsrReportDetailPage: NextPage = () => {
  const { user } = useAuth();
  const router = useRouter();

  const [csrReport, setCsrReport] = useState<CsrReport>();

  useEffect(() => {
    if (!user) return;
    if (!router.query.id) return;
    async function retrieveCsrReport() {
      AxiosClient.get(`${URL_REPORT}/detail/${router.query.id}`)
        .then((response) => {
          let csrReportObj = new CsrReportClass(response.data);
          setCsrReport(csrReportObj);
          console.log(response.data);
        })
        .catch((err: AxiosError) => {
          toast.error(err.message);
          console.log(err);
        });
    }
    retrieveCsrReport();
  }, [user, router]);

  return (
    <div className="w-0 min-w-full">

      {!!csrReport && <CsrReportDetail {...csrReport} />}

    </div>
  );
};
export default withAuth(withLayout(CsrReportDetailPage));
