import { Outlet } from "../outlet";
import { Customer, CustomerClass } from "../customer";
import { CsrReport, CsrReportClass } from "@models/report/CsrReport";
import { Period } from "@models/period";

export interface Complaint {
  id: number;
  customer: Customer;
  content: string;
  report?: CsrReport;
  period: Period;
}

export interface ComplaintMutation {
  content: string;
  report?: number;
  period: number;
}

export class ComplaintClass implements Complaint {
  id: number;
  customer: Customer;
  content: string;
  report?: CsrReport;
  period: Period;

  constructor(obj: any) {
    this.id = obj.id;
    this.customer = obj.customer;
    this.content = obj.content,
    this.report = obj.report;
    this.period = obj.period;
  }
} 