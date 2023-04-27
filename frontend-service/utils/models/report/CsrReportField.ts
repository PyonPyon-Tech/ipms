import { getPeriodFromDate } from "@functions/getPeriodFromDate";
import { CsrArea } from "./CsrQuestion/CsrFindingArea";

// new Date().toLocaleTimeString("en-ID", { hour12: false })
export class CsrReportFieldClass implements CsrReportField {
  reportType: number;
  visitationType: number;
  period: Id;
  technician: Id;
  outlet: Id;
  date: string;
  start: string;
  end: string;
  technicianSignature: string;
  picSignature: string;
  visitationPhoto: string;
  detailAreas: { status: string; recommendations: string[]; imageUrls: string[] }[];
  detailPests: { status: string; pest: string; recommendations: string[]; imageUrls: string[] }[];
  pesticideUsages: { pesticide: Id; amount: string }[];

  constructor(form: any, technicianId: any) {
    this.reportType = 1;
    this.visitationType = Number(form.type);
    this.date = form.date;
    this.start = form.start;
    this.end = form.end;
    this.outlet = {
      id: Number(form.outlet),
    };
    this.period = {
      id: getPeriodFromDate(form.date),
    };
    this.technician = {
      id: technicianId,
    };
    this.technicianSignature = "";
    this.picSignature = "";
    this.visitationPhoto = "";
    this.detailAreas = form.detailAreas.map((detail: any) => {
      return {
        displayNumber: detail.displayNumber,
        finding: detail.finding,
        status: Number(detail.status),
        area: {
          id: Number(detail.area.id),
        },
        recommendation: detail?.recommendation?.map((x: any)=> x.value) ?? [],
        imageUrls: [],
      };
    });
    this.detailAreas = this.detailAreas.filter((x) => !!x);
    this.detailPests = form.detailPests.map((detail: any) => {
      return {
        status: Number(detail.status),
        recommendation: detail?.recommendation?.map((x: any)=> x.value) ?? [],
        imageUrls: [],
        pest: detail.pest.label,
      };
    });
    this.pesticideUsages = form.pesticideUsages.map((detail: any) => {
      return {
        pesticide:{
          id: detail.name.value,
        } as Id,
        amount: detail.amount,
      };
    });
  }
  setImages(data: { name: string; url: string }[]) {
    data.forEach((x) => this.setImage(x.name, x.url));
  }
  private setImage(name: string, url: string) {
    if (name.startsWith("visitationPhoto")) {
      this.visitationPhoto = url;
    } else if (name.startsWith("technician")) {
      this.technicianSignature = url;
    } else if (name.startsWith("pic")) {
      this.picSignature = url;
    } else {
      const namesplit = name.split("-");
      const index = Number(namesplit[1]);
      if (namesplit[0] == "detailAreas") {
        this.detailAreas[index-1].imageUrls.push(url); // detailAreas mulai dari 1
      } else if (namesplit[0] == "detailPests") {
        this.detailPests[index].imageUrls.push(url); // ini mulai dari 0
      }
    }
  }
}

export interface CsrReportField {
  reportType: number;
  visitationType: number;
  period: Id;
  outlet: Id;
  technician: Id;
  date: string;
  start: string;
  end: string;
  technicianSignature: string;
  picSignature: string;
  visitationPhoto: string;
  detailAreas: { status: string; recommendations: string[]; imageUrls: string[] }[];
  detailPests: { status: string; pest: string; recommendations: string[]; imageUrls: string[] }[];
  pesticideUsages: { pesticide: Id; amount: string }[];
}

interface Id {
  id: number;
}
// export interface CsrDetailAreaField {
//   area: number;
//   displayNumber: string;
//   finding: string;
//   status: number;
//   recommendation: string[];
//   image: File[];
// }

// export interface CsrDetailPestField {
//   pest: string;
//   status: number;
//   recommendation: string[];
//   image: File[];
// }
// export interface CsrPesticideUsageField {
//   pesticide: number;
//   amount: string;
// }
