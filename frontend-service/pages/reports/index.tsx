import { ReportFilter } from "@components/csr/reports/ReportFilter";
import { ReportContainer } from "@components/csr/reports/ReportsContainer";
import { Title } from "@components/general/Title";
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

interface ReportListDataInterface {
  data: CsrReportClass[];
  page: number;
  totalPages: number;
  count: number;
}

export const ReportListPage: NextPage = () => {
  const [data, setData] = useState<ReportListDataInterface>();
  const [filterData, setFilterData] = useState<ListReportFilterDataInterface>({
    period: getPeriodFromDate(new Date()),
    category: "DEFAULT",
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
    console.log(filterData);
    if (!user || !period) return;
    if (category != "DEFAULT" && item == "DEFAULT" && page != 1) {
      toast.error(`Silahkan pilih ${category} terlebih dahulu`);
      return;
    }
    async function loadEmployeeReports() {
      let url = listReportCreateBaseURL(user as User, period, category, item, page);
      console.log(url);
      AxiosClient.get(url)
        .then((response) => {
          console.log(response.data);
          const { count, data, page, totalPages } = response.data;
          setData({
            count: count,
            data: data.map((x: any) => new CsrReportClass(x)),
            page: page,
            totalPages: totalPages,
          });
        })
        .catch((err) => {
          toast.error("Error");
          console.error(err);
        });
    }
    loadEmployeeReports();
  }, [user, filterData]);

  return (
    <div className="mb-4 w-full md:pt-0">
      <Title title="Daftar Laporan Treatment" />
      <ReportFilter category={filterData.category} setPartialFilterData={setPartialFilterData} />
      <ReportContainer data={data?.data ?? []} count={data?.count ?? 0} />
      <div className="w-full flex items-center justify-center my-10">
        <Pagination
          page={filterData.page ?? 1}
          count={data?.totalPages ?? 1}
          onChange={(_, value) => {
            setPartialFilterData("page", Number(value));
          }}
        />
      </div>
    </div>
  );
};
export default withAuth(withLayout(ReportListPage));
