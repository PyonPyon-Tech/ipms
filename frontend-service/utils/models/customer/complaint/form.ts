import { Complaint, ComplaintMutation } from ".";
import { Customer } from "../customer";
import { CsrReport, CsrReportClass } from "@models/report/CsrReport";
import { Period } from "@models/period";
import { getPeriodFromDate } from "@functions/getPeriodFromDate";
import { OutletCard } from "@components/customers/OutletList/outletCard";

export interface ComplaintFields {
  outlet: number;
  content: string;
  report?: number;
  period: number;
} // Untuk form fields

export class ComplaintFormFactory {
  static createComplaintFields(obj: Complaint): ComplaintFields {
    const complaintFields: ComplaintFields = {
      outlet: obj.outlet.id,
      content: obj.content,
      period: obj.period.id,
    };
  
    if (obj.report) {
      complaintFields.report = obj.report.id;
    }
  
    return complaintFields;
  }  

  static complaintMutationFromData({ outlet, content, report, period }: ComplaintFields): ComplaintMutation {
    const complaintMutation: ComplaintMutation = {
      outlet: outlet,
      content: content,
      period: getPeriodFromDate(new Date()),
    };
  
    if (report) {
      complaintMutation.report = report;
    }
  
    return complaintMutation;
  }
}
