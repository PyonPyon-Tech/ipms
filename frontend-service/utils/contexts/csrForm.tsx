

import { AxiosClient, URL_REPORT } from "@constants/api";
import { useAuth } from "@hooks/useAuth";
import { CsrInitialData, CsrInitialDataClass } from "@models/report/CsrInitialData";
import { CsrReportField } from "@models/report/CsrReportField";
import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  FC,
} from "react";
import toast from "react-hot-toast";

export const CsrFormContext = createContext<{
  initialData: CsrInitialData
  setState: (obj: any, x: keyof CsrReportField) => void
}>({
  initialData: new CsrInitialDataClass(),
  setState: (x,y)=>{}
});

export const CsrFormProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
    const { user } = useAuth();
    const router = useRouter();
    const q = router.query

    const [initialData, setInitialData] = useState<CsrInitialData>(new CsrInitialDataClass)

    function setState(obj: any, key: keyof CsrReportField){
      // if(key == "")
    }

    useEffect(()=>{
        if (!user || (!q?.period) || !q?.technician) return;
        async function loadInitialData(technician: any, period: any) {
            const t = toast.loading("Mengambil data...")
            AxiosClient.get(`${URL_REPORT}/${technician}/${period}`)
            .then((response) => {
                setInitialData(CsrInitialDataClass.deserialize(response.data))
            }).catch((error: AxiosError) => {
                toast.error(error.message)
            }).finally(()=>{
                toast.dismiss(t)
            })
        }
        loadInitialData(q.technician, q.period)
    },[user])
  return (
    <CsrFormContext.Provider value={{initialData}}>{children}</CsrFormContext.Provider>
  );
};
