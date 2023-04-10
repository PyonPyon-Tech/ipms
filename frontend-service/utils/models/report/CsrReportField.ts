import { CsrArea } from "./CsrQuestion/CsrFindingArea";

// new Date().toLocaleTimeString("en-ID", { hour12: false })
// export class CsrReportFieldClass implements CsrReportField {
//   reportType: number;
//   visitationType: number;
//   date: Date;
//   start: string;
//   end: string;
//   detailAreas: CsrDetailAreaField[];
//   detailPests: CsrDetailPestField[];
//   pesticideUsages: CsrPesticideUsageField[];

//   constructor() {
//     this.reportType = 1;
//     this.visitationType = 1;
//     this.date = new Date();
//     this.start = new Date().toLocaleTimeString("en-ID", { hour12: false });
//     this.end = new Date().toLocaleTimeString("en-ID", { hour12: false });
//     this.detailAreas = [];
//     this.detailPests = [];
//     this.pesticideUsages = [];
//   }
// }

export interface CsrReportField {
  reportType?: number;
  visitationType?: number;
  outlet?: number;
  date?: Date;
  start?: string;
  end?: string;
  technicianSignature?: File;
  picSignature?: File;
  visitationPhoto?: File;
  detailAreas?: CsrDetailAreaField[];
  detailPests?: CsrDetailPestField[];
  pesticideUsages?: CsrPesticideUsageField[];
}

export interface CsrDetailAreaField {
  area: number;
  displayNumber: string;
  finding: string;
  status: number;
  recommendation: string[];
  image: File[];
}

export interface CsrDetailPestField {
  pest: string;
  status: number;
  recommendation: string[];
  image: File[];
}
export interface CsrPesticideUsageField {
  pesticide: number;
  amount: string;
}
