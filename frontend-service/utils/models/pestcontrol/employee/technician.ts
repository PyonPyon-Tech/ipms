import { Outlet, OutletClass } from "@models/customer/outlet";
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
