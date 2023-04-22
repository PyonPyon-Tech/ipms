import { ReportFilter } from "@components/csr/reports/ReportFilter";
import { ReportContainer } from "@components/csr/reports/ReportsContainer";
import { AxiosClient } from "@constants/api";
import { getPeriodFromDate } from "@functions/getPeriodFromDate";
import { withAuth } from "@functions/withAuth";
import { withLayout } from "@functions/withLayout";
import { useAuth } from "@hooks/useAuth";
import { CsrReportClass } from "@models/report/CsrReport";
import { User } from "@models/user";
import { Pagination } from "@mui/material";
import { ListReportFilterDataInterface, listReportCreateBaseURL } from "@type/listReport";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";


export const ReportListPage: NextPage = () => {
  const [data, setData] = useState<CsrReportClass[]>([]);
  const [filterData, setFilterData] = useState<ListReportFilterDataInterface>({
    period: getPeriodFromDate(new Date()),
    category: "",
    page: 1,
  });
  const setPartialFilterData = (key: keyof ListReportFilterDataInterface, value: any) => {
    if (key == "category") {
      setFilterData({ ...filterData, category: value, page: 1, item: "DEFAULT" });
    } else if (key == "item" || key == "period") {
      setFilterData({ ...filterData, [key]: value, page: 1 });
    } else {
      setFilterData({ ...filterData, page: value });
    }
  };

  const { user } = useAuth();
  useEffect(() => {
    const { category, page, period, item } = filterData;
    if (!user || !period || (category && item == "DEFAULT")) return;
    async function loadEmployeeReports() {
      let url = listReportCreateBaseURL(user as User, period, category, item, page);
      console.log(url)
      AxiosClient.get(url)
        .then((response) => {
          console.log(response.data);
          setData(response.data.map((x: any) => new CsrReportClass(x)));
        })
        .catch((err) => {
          toast.error("Error");
          console.error(err);
        });
    }
    loadEmployeeReports();
  }, [user, filterData]);

  return (
    <div className="mb-4 w-full p-8 md:p-12 md:pt-0">
      <ReportFilter category={filterData.category} setPartialFilterData={setPartialFilterData} />
      <ReportContainer data={data} />
      <Pagination page={filterData.page} />
    </div>
  );
};
export default withAuth(withLayout(ReportListPage));
