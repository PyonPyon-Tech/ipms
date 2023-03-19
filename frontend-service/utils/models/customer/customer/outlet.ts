export interface Outlet {
    id: number;
    name: string;
    region: string;
    address: string;
    supervisor: { id: number, user: { name: string }};
  }
  
export class OutletClass implements Outlet {
  id: number;
  name: string;
  region: string;
  address: string;
  supervisor: { id: number, user: { name: string }};

  constructor(obj: any) {
    this.id = obj.id;
    this.name = obj.name;
    this.region = obj.region;
    this.address = obj.address;
    this.supervisor = obj.supervisor;
  }
} 