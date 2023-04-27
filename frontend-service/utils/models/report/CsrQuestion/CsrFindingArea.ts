export interface CsrFindingArea{
    id: number;
    area?: CsrArea;
    displayNumber: string;
    question: string;
    recommendations: string[];
}

export interface CsrArea {
    id: number;
    area: string;
    findings?: CsrFindingArea[]
  }
  