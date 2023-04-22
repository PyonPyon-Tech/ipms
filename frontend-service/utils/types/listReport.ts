import { URL_REPORT } from "@constants/api";
import { ROLES_ENGLISH } from "@constants/roles";
import { User } from "@models/user";

export type ReportCategories = "technician" | "supervisor" | "outlet" | "customer";
export interface ListReportFilterDataInterface {
  period: number;
  category: ReportCategories | "";
  item?: string | number;
  page: number;
}
export interface ListReportDataInterface {}
export const listReportCreateBaseURL = (user: User, period: any, category: any, item: any, page: any): string => {
  const { id, role } = user;
  let url = `${URL_REPORT}/summary/${period}`;
  if (category && item) {
    url = `${url}/${category}/${item}`;
  } else if (role != 1 && role != 2) {
    url = `${url}/${ROLES_ENGLISH[role]}/${id}`;
  }
  return `${url}?page=${page}`;
};
