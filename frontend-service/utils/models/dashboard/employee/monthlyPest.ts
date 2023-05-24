export interface MonthlyPestTrendData {
  flies: number;
  cockroach: number;
  rodent: number;
  others: number;
}
export class MonthlyPestTrendDataClass implements MonthlyPestTrendData{
  flies: number;
  cockroach: number;
  rodent: number;
  others: number;

  constructor(obj: any) {
      this.flies= obj.flies;
      this.cockroach = obj.cockroach;
      this.rodent = obj.rodent;
      this.others = obj.others;
  }
}