export interface CsrFindingArea{
    id: number;
    area?: CsrArea;
    displayNumber: string;
    question: string;
    recommendation: string[];
}

export interface CsrArea {
    id: number;
    area: string;
    findings?: CsrFindingArea[]
  }
  