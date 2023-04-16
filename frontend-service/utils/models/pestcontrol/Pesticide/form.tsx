import { Pesticide, PesticideMutation } from ".";

export interface PesticideFields {
    id: number;
    name: string;
    activeIngredient?: string;
    targets?: string;
    unit?: string;
    stock: number;
}

export class PesticideFormFactory{
    static createPesticideFields(obj: Pesticide): PesticideFields{
        return{
            id: obj.id,
            name: obj.name,
            activeIngredient: obj.activeIngredient,
            targets: obj.targets,
            unit: obj.unit,
            stock: obj.stock
        }
    }

    static pesticideMutationFromData({id, name, activeIngredient, targets, unit, stock}:
        PesticideFields): PesticideMutation {
            return{
                pesticide: {
                    id,
                    name,
                    activeIngredient,
                    targets,
                    unit,
                    stock,
                },
            };
        }
    }