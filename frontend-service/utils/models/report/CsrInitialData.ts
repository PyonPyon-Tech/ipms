import { Outlet } from "@models/customer/outlet";
import { Pest } from "@models/pestcontrol/Pest";
import { CsrArea } from "@models/report/CsrQuestion/CsrFindingArea";
import { Pesticide } from "@models/pestcontrol/Pesticide";

export interface CsrInitialData {
  areas: CsrArea[];
  pests: Pest[];
  outlets: Outlet[];
  pesticides: Pesticide[];
}
export class CsrInitialDataClass implements CsrInitialData {
  areas: CsrArea[] = [];
  pests: Pest[] = [];
  outlets: Outlet[] = [];
  pesticides: Pesticide[] = [];

  static deserialize(obj: any): CsrInitialData {
    return obj as CsrInitialData;
  }
}
