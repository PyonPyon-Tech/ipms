import { AxiosClient, URL_REPORT } from "@constants/api";
import { getPeriodFromDate } from "@functions/getPeriodFromDate";
import { uploadImages, validateForm } from "@functions/uploadImagePromise";
import { useAuth } from "@hooks/useAuth";
import { CsrInitialData, CsrInitialDataClass } from "@models/report/CsrInitialData";
import { CsrReportField, CsrReportFieldClass } from "@models/report/CsrReportField";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/router";
import React, { createContext, useState, useContext, useEffect, FC, useCallback } from "react";
import toast from "react-hot-toast";

export const CsrFormContext = createContext<{
  initialData: CsrInitialData | null;
  getInitialData: (x: any, y: Date) => Promise<void>;
  // upload?: (x: any) => Promise<{ id: string; value: string[] }>[];
  upload?: (form: any) => Promise<CsrReportField | null>;
}>({
  initialData: null,
  getInitialData: async (x, y) => {},
});

export const CsrFormProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const router = useRouter();
  const q = router.query;

  const [initialData, setInitialData] = useState<CsrInitialData | null>(null);

  const getInitialData = async (technician: any, date: Date) => {
    const t = toast.loading("Mengambil data...");
    AxiosClient.get(`${URL_REPORT}/${technician}/${getPeriodFromDate(date)}`)
      .then((response) => {
        console.log(response)
        setInitialData(new CsrInitialDataClass(response.data));
        console.log(new CsrInitialDataClass(response.data));
      })
      .catch((error: AxiosError) => {
        toast.error((error.response as any).data?.message ?? "Error");
      })
      .finally(() => {
        toast.dismiss(t);
      });
  };

  const upload = async (form: any): Promise<CsrReportField | null> => {
    const csrReportField = new CsrReportFieldClass(form, Number(q.technician));
    console.log(csrReportField);
    const err = validateForm(form);
    if (err) {
      toast.error(err, {
        duration: 5000,
      });
      return null;
    }

    const uploadedPhoto = await uploadImages(form, q.technician, toast);
    console.log(uploadedPhoto);
    csrReportField.setImages(uploadedPhoto);
    console.log(csrReportField);
    return csrReportField;
  };

  return <CsrFormContext.Provider value={{ initialData, getInitialData, upload }}>{children}</CsrFormContext.Provider>;
};
