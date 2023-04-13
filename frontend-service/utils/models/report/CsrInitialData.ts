import { Outlet } from "@models/customer/outlet";
import { Pest } from "@models/pestcontrol/Pest";
import { CsrArea } from "@models/report/CsrQuestion/CsrFindingArea";
import { Pesticide } from "@models/pestcontrol/Pesticide";
import { CsrDetailAreaField, CsrDetailPestField, CsrReportField } from "./CsrReportField";
import { CsrFindingPest } from "./CsrQuestion/CsrFindingPest";

export interface CsrInitialData {
  areas: CsrArea[];
  pests: CsrFindingPest[];
  outlets: Outlet[];
  pesticides: Pesticide[];
}
export class CsrInitialDataClass implements CsrInitialData {
  areas: CsrArea[];
  pests: CsrFindingPest[];
  outlets: Outlet[];
  pesticides: Pesticide[];

  constructor({areas, pests, outlets, pesticides}: any) {
    this.areas = areas;
    this.pests = pests;
    this.outlets = outlets;
    this.pesticides = pesticides;
  }

  createFields(): CsrReportField{
    const detailAreas: CsrDetailAreaField[] = []
    const detailPests: CsrDetailPestField[] = []
    this.areas.forEach(x=>{
      x.findings?.map(y=>{
        detailAreas.push({
          area: x.id,
          displayNumber: y.displayNumber,
          finding: y.question,
          status: -1,
          recommendation: y.recommendations,
          image: []
        })
      })
    })
    
    return{
      reportType: 1,
      visitationType: 1,
      date: new Date(),
      start:  new Date().toLocaleTimeString("en-ID", { hour12: false }),
      end:  new Date().toLocaleTimeString("en-ID", { hour12: false }),
      detailAreas,
      detailPests,
      pesticideUsages: [],
      outlet: -1
    }
  }
}
