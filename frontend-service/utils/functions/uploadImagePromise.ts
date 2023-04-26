import { AxiosClient, URL_AUTH, URL_IMAGE } from "@constants/api";
import axios, { AxiosError, AxiosResponse } from "axios";

const uploadImagePromise = (files: File[], outlet: any, id: any): Promise<AxiosResponse<any, any>> => {
  const bodyFormData: any = new FormData();
  files.forEach((file) => {
    bodyFormData.append("file", file);
  });
  return AxiosClient.post(`${URL_IMAGE}/${outlet}/${id}`, bodyFormData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const uploadImages = async (
  form: any,
  technician: any,
  toast: any
): Promise<{ name: string; url: string }[]> => {
  const { area, main, pest } = extractImage(form);
  const promises: Promise<AxiosResponse<any, any>>[] = [];
  if (area.length > 0) {
    promises.push(uploadImagePromise(area, form.outlet, technician));
  }
  if (main.length > 0) {
    promises.push(uploadImagePromise(main, form.outlet, technician));
  }
  if (pest.length > 0) {
    promises.push(uploadImagePromise(pest, form.outlet, technician));
  }
  const images: { name: string; url: string }[] = [];
  const t = toast.loading("Mengupload foto");
  await Promise.all(promises)
    .then((results) => {
      results.forEach(({ data }) => {
        console.log(data.status);
        Object.keys(data.status).forEach((key) => {
          images.push({
            name: key,
            url: data.status[key],
          });
        });
      });
    })
    .catch((error) => {
      console.error(error);
      toast.error("Tidak bisa mengupload");
    })
    .finally(() => {
      toast.dismiss(t);
    });
  return images;
};

export const validateForm = (x: any): string => {
  if (!x.date || !x.start || !x.outlet || !x.end || !x.type) {
    return "Pastikan semua kolom data terisi";
  }
  if (!x.technicianSignature || !x.picSignature || !x.visitationPhoto) {
    return "Pastikan tanda tangan dan foto kunjungan terisi";
  }
  if (
    x.detailAreas?.find((detailArea: any, index: number) => {
      if (typeof detailArea == "undefined") {
        return false;
      }
      if (detailArea?.status == "2") {
        if (Array.isArray(detailArea.recommendation)) {
          return !detailArea?.images || detailArea?.recommendation.length > 0;
        }
        return !detailArea?.images || !detailArea?.recommendation;
      }
      return false;
    })
  ) {
    return "Semua kolom temuan area wajib diisi";
  }
  if (
    x.detailPests?.find((detailPest: any) => {
      return (
        (detailPest?.status == "2" && !detailPest?.images) ||
        !detailPest?.recommendation ||
        !detailPest?.status ||
        !detailPest?.pest
      );
    })
  ) {
    return "Semua kolom temuan hama wajib diisi";
  }
  if (
    x.pesticideUsages?.find((usage: any) => {
      return !usage.amount || !usage.name;
    })
  ) {
    return "Semua kolom pestisida wajib diisi";
  }
  return "";
};

export const extractImage = (
  x: any
): {
  main: File[];
  area: File[];
  pest: File[];
} => {
  // if (!validate(x)) return;
  const techsignature = x.technicianSignature;
  const picsignature = x.picSignature;
  const visitationPhoto: any[] = x.visitationPhoto;
  const mainImage = [techsignature, picsignature, ...visitationPhoto];
  // get all image from detailAreas
  const areasImages: File[] = [];
  x.detailAreas.forEach((detailArea: any) => {
    if (!!detailArea.images && Array.isArray(detailArea.images)) {
      detailArea.images.forEach((img: File) => areasImages.push(img));
    }
  });

  const pestImages: File[] = [];
  x.detailPests.forEach((detailPest: any) => {
    if (!!detailPest.images && Array.isArray(detailPest.images)) {
      detailPest.images.forEach((img: File) => pestImages.push(img));
    }
  });
  return {
    main: mainImage,
    area: areasImages,
    pest: pestImages,
  };
};
