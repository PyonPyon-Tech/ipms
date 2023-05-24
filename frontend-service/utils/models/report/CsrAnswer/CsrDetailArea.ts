import { CsrArea } from "../CsrQuestion/CsrFindingArea";

export interface CsrDetailArea {
  area: CsrArea;
  displayNumber: string;
  finding: string;
  id: number;
  status: number;
  recommendation: string[];
  imageUrls: string[];
}