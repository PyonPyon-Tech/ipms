import { ReportFilter } from "@components/csr/reports/ReportFilter";
import { ReportContainer } from "@components/csr/reports/ReportsContainer";
import { AxiosClient, URL_REPORT } from "@constants/api";
import { getPeriodFromDate } from "@functions/getPeriodFromDate";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { useAuth } from "@hooks/useAuth";
import { CsrReportClass } from "@models/report/CsrReport";
import { ReportCategories } from "@type/report";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export const ReportListPage: NextPage = () => {
  const [data, setData] = useState<CsrReportClass[]>([]);
  const [period, setPeriod] = useState<number>(getPeriodFromDate(new Date()));
  const [category, setCategory] = useState<ReportCategories | "">("");
  const [item, setItem] = useState<string | number>();

  const { user } = useAuth();
  useEffect(() => {
    if (!user || !period || item == 'DEFAULT') return;
    async function loadEmployeeReports() {
      let url = `${URL_REPORT}/summary/${period}`;
      if (category && item) {
        url = `${url}/${category}/${item}`;
      }
      console.log(url)
      AxiosClient.get(url)
        .then((response) => {
          console.log(response.data);
          console.log("KKK");
          setData(response.data.map((x: any) => new CsrReportClass(x)));
        })
        .catch((err) => {
          toast.error("Error");
          console.error(err);
        });
    }
    loadEmployeeReports();
  }, [user, period, category, item]);

  return (
    <div className="mb-4 w-full p-8 md:p-12 md:pt-0">
      <ReportFilter
        {...{
          setCategory,
          category,
          setItem,
          setPeriod,
        }}
      />
      <ReportContainer data={data} />
    </div>
  );
};
export default withAuth(withLayout(ReportListPage));
