import { AxiosClient, URL_REPORT } from "@constants/api";
import { getPeriodFromDate } from "@functions/getPeriodFromDate";
import { useAuth } from "@hooks/useAuth";
import {
  CsrInitialData,
  CsrInitialDataClass,
} from "@models/report/CsrInitialData";
import {
  CsrReportField,
} from "@models/report/CsrReportField";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  FC,
  useCallback,
} from "react";
import toast from "react-hot-toast";

export const CsrFormContext = createContext<{
  initialData: CsrInitialData | null;
  reportData: CsrReportField | null;
  setField: (key: keyof CsrReportField, value: any) => void;
}>({
  initialData: null,
  reportData: null,
  setField: () => {},
});

export const CsrFormProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  const router = useRouter();
  const q = router.query;

  const [initialData, setInitialData] = useState<CsrInitialData | null>(null);

  const [data, setData] = useState<CsrReportField | null>(null);

  const setField = useCallback((key: keyof CsrReportField, value: any)=> {
    if(!user || !q.technician) return;
    setData({...data, [key]: value})
    if (key == "date") {
      getInitialData(q.technician, value)
    };
  },[user, q])

  const getInitialData = async (technician: any, date: Date) => {
    const t = toast.loading("Mengambil data...");
    AxiosClient.get(`${URL_REPORT}/${technician}/${getPeriodFromDate(date)}`)
      .then((response) => {
        const x = new CsrInitialDataClass(response.data)
        setInitialData(x);
        
      })
      .catch((error: AxiosError) => {
        toast.error(error.message);
      })
      .finally(() => {
        toast.dismiss(t);
      });
  };

  return (
    <CsrFormContext.Provider value={{ initialData }}>
      {children}
    </CsrFormContext.Provider>
  );
};
