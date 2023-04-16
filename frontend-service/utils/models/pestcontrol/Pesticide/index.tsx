export interface Pesticide {
    id: number;
    name: string;
    activeIngredient: string;
    targets: string;
    unit: string;
    stock: number;
}
export class PesticideClass implements Pesticide {
    id: number;
    name: string;
    activeIngredient: string;
    targets: string;
    unit: string;
    stock: number;
    constructor(obj: any){
        this.id = obj.id;
        this.name = obj.name;
        this.activeIngredient = obj.activeIngredient;
        this.targets = obj.targets;
        this.unit = obj.unit;
        this.stock = obj.stock;
    }
}