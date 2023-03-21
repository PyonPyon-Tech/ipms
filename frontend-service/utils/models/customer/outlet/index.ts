export interface Outlet {
  customer: { id: number };
  id: number;
  name: string;
  region: string;
  address: string;
  supervisor: { id: number, user: { name: string }};
}

export interface OutletMutation {
  customer: { id: number };
  name: string;
  region: string;
  address: string;
  supervisor: { id: number, user: { name: string }};
}
  
export class OutletClass implements Outlet {
  customer: { id: number };
  id: number;
  name: string;
  region: string;
  address: string;
  supervisor: { id: number, user: { name: string }};

  constructor(obj: any) {
    this.customer = obj.customer;
    this.id = obj.id;
    this.name = obj.name;
    this.region = obj.region;
    this.address = obj.address;
    this.supervisor = obj.supervisor;
  }
} 