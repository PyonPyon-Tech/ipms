export class OutletVisitations {
  outletId!: number;
  outletName!: string;
  outletAddress!: string;
  count!: number;
  visitations!: {
    id: number;
    date: string;
  }[];

  constructor(outletVisitations: any[]) {
    this.outletId = outletVisitations[0]?.outlet.id;
    this.outletName = outletVisitations[0]?.outlet.name;
    this.count =  outletVisitations[0]?.outlet.count ?? 2;
    this.outletAddress = outletVisitations[0]?.outlet.address;
    this.visitations = outletVisitations.map((x) => {
      return {
        id: x.id,
        date: new Date(x?.date)?.toISOString()?.split("T")[0] ?? "",
      };
    });
  }
} // To aggregate
