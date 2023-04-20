import { Pesticide, PesticideMutation } from ".";

export interface PesticideFields {
    name: string;
    activeIngredient?: string;
    stock: number;
}

export class PesticideFormFactory{
    static createPesticideFields(obj: Pesticide): PesticideFields{
        return{
            name: obj.name,
            activeIngredient: obj.activeIngredient,
            stock: obj.stock
        }
    }

    static pesticideMutationFromData({name, activeIngredient, stock}:
        PesticideFields): PesticideMutation {
            return{
                name,
                stock,
                activeIngredient
            };
        }
    }