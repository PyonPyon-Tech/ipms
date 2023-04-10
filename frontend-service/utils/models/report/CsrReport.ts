import { Outlet } from "@models/customer/outlet";
import { Period } from "@models/period";
import { Employee } from "@models/pestcontrol/employee";
import { EmployeeTechnician } from "@models/pestcontrol/employee/form";
import { User } from "@models/user";
import { CsrDetailArea } from "./CsrAnswer/CsrDetailArea";
import { CsrDetailPest } from "./CsrAnswer/CsrDetailPest";
import { CsrPesticideUsage } from "./CsrAnswer/CsrPesticideUsage";

export interface CsrReport {
    id: number;
    reportType: number;
    visitationType: number;
    feedback: object;
    period: Period;
    technician: EmployeeTechnician;
    outlet: OutletExtended,
    date: string;
    start: string;
    end: string;
    technicianSignature: string;
    picSignature: string;
    visitationPhoto: string;
    detailAreas: CsrDetailArea[];
    detailPests: CsrDetailPest[];
    pesticideUsages: CsrPesticideUsage[];
}

interface OutletExtended extends Outlet {
    customer: {
        id: number;
        user: User;
        contact: string;
        visitationFrequency: number;
        startContract: string;
        endContract: string;
    }
}
