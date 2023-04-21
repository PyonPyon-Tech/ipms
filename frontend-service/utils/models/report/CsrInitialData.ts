import { Outlet } from "@models/customer/outlet";
import { CsrArea } from "@models/report/CsrQuestion/CsrFindingArea";
import { Pesticide } from "@models/pestcontrol/Pesticide";
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
}
