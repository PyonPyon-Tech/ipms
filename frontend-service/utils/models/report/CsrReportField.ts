import { CsrArea } from "./CsrQuestion/CsrFindingArea";

export interface CsrReportField{
    reportType: number;
    visitationType: number;
    outlet: number,
    start: Date;
    end: Date;
    technicianSignature: File;
    picSignature: File;
    visitationPhoto: File;
    detailAreas: CsrDetailAreaField[];
    detailPests: CsrDetailPestField[];
    pesticideUsages: CsrPesticideUsageField[];
}

export interface CsrDetailAreaField {
    area: number;
    displayNumber: string;
    finding: string;
    status: number;
    recommendation: string[];
    image: File[];
  }

export interface CsrDetailPestField{
    pest: string;
    status: number;
    recommendation: string[];
    image: File[];
}
export interface CsrPesticideUsageField {
    pesticide: number
    amount: string
}