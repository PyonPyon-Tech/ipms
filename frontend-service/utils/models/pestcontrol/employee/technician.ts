import { Outlet, OutletClass } from "@models/customer/outlet";
import { CsrReportField, CsrReportFieldClass } from "@models/report/CsrReportField";
import { Employee, EmployeeClass } from ".";

export interface TechnicianOutlets extends Employee {
  outlets: Outlet[];
}

export class TechnicianOutletsClass
  extends EmployeeClass
  implements TechnicianOutlets
{
  outlets: Outlet[];
  constructor(obj: any) {
    super(obj);
    this.outlets = obj.outlets.map((x: any) => new OutletClass(x));
  }
}

// export interface TechnicianReports  {
//   csrReports: CsrReportField[];
// }

// export class TechnicianReportsClass
//   implements TechnicianReports
// {
//   csrReports: CsrReportField[];
//   constructor (obj: any, technicianId: any) { 
//     this.csrReports = obj.csrReports.map((x: any, index) => new CsrReportFieldClass(x, technicianId));
//   }
// }