import { AxiosClient, URL_REPORT } from "@constants/api";
import { getPeriodFromDate } from "@functions/getPeriodFromDate";
import { useAuth } from "@hooks/useAuth";
import { CsrInitialData, CsrInitialDataClass } from "@models/report/CsrInitialData";
import { CsrReportField } from "@models/report/CsrReportField";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { createContext, useState, useContext, useEffect, FC, useCallback } from "react";
import toast from "react-hot-toast";

export const CsrFormContext = createContext<{
  initialData: CsrInitialData | null;
  getInitialData: (x: any, y: Date) => Promise<void>;
}>({
  initialData: null,
  getInitialData: async (x, y) => {},
});

export const CsrFormProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();
  const q = router.query;

  const [initialData, setInitialData] = useState<CsrInitialData | null>(null);

  // const [data, setData] = useState<CsrReportField | null>(null);

  const getInitialData = async (technician: any, date: Date) => {
    const t = toast.loading("Mengambil data...");
    AxiosClient.get(`${URL_REPORT}/${technician}/${getPeriodFromDate(date)}`)
      .then((response) => {
        setInitialData(new CsrInitialDataClass(response.data));
        console.log(new CsrInitialDataClass(response.data))
      })
      .catch((error: AxiosError) => {
        toast.error((error.response as any).data?.message ?? "Error");
      })
      .finally(() => {
        toast.dismiss(t);
      });
  };

  return <CsrFormContext.Provider value={{ initialData, getInitialData }}>{children}</CsrFormContext.Provider>;
};
