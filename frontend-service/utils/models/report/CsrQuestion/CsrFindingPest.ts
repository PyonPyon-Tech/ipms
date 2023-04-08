import { Pest } from "@models/pestcontrol/Pest"

export interface CsrFindingPest{
    id: number
    pest: Pest
    recommendations: string[]
}