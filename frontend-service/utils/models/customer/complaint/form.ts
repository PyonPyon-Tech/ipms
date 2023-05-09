import { Complaint, ComplaintMutation } from ".";
import { Customer } from "../customer";
import { CsrReport, CsrReportClass } from "@models/report/CsrReport";
import { Period } from "@models/period";
import { getPeriodFromDate } from "@functions/getPeriodFromDate";

export interface ComplaintFields {
  content: string;
  report?: number;
  period: number;
} // Untuk form fields

export class ComplaintFormFactory {
  static createComplaintFields(obj: Complaint): ComplaintFields {
    const complaintFields: ComplaintFields = {
      content: obj.content,
      period: obj.period.id,
    };
  
    if (obj.report) {
      complaintFields.report = obj.report.id;
    }
  
    return complaintFields;
  }  

  static complaintMutationFromData({ content, report, period }: ComplaintFields): ComplaintMutation {
    const complaintMutation: ComplaintMutation = {
      content: content,
      period: getPeriodFromDate(new Date()),
    };
  
    if (report) {
      complaintMutation.report = report;
    }
  
    return complaintMutation;
  }
}
