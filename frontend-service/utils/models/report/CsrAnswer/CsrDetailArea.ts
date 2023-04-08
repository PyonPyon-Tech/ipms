import { CsrArea } from "../CsrQuestion/CsrFindingArea";

export interface CsrDetailArea {
  area: CsrArea;
  displayNumber: string;
  finding: string;
  status: number;
  recommendation: string[];
  imageUrl: string;
}