import { Pesticide } from "@models/pestcontrol/Pesticide"

export interface CsrPesticideUsage {
    pesticide: Pesticide
    amount: string
}