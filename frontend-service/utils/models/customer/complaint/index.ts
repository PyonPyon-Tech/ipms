import { Outlet } from "../outlet";
import { Customer, CustomerClass } from "../customer";
import { CsrReport, CsrReportClass } from "@models/report/CsrReport";
import { Period } from "@models/period";

export interface Complaint {
  id: number;
  customer: Customer;
  outlet: Outlet;
  content: string;
  report?: CsrReport;
  period: Period;
  isAcknowledged: number;
  date: string;
  time: string;
}

export interface ComplaintMutation {
  outlet: number;
  content: string;
  report?: number;
  period: number;
}

export class ComplaintClass implements Complaint {
  id: number;
  customer: Customer;
  outlet: Outlet;
  content: string;
  report?: CsrReport;
  period: Period;
  isAcknowledged: number;
  date: string;
  time: string;

  constructor(obj: any) {
    this.id = obj.id;
    this.customer = obj.customer;
    this.outlet = obj.outlet;
    this.content = obj.content,
    this.report = obj.report;
    this.period = obj.period;
    this.isAcknowledged = obj.isAcknowledged;
    this.date = obj.date;
    this.time = obj.time;
  }
} 