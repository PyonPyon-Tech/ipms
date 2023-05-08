import { Outlet, OutletMutation } from ".";

export interface OutletFields {
  customerId: number;
  name: string;
  region: string;
  address: string;
  supervisorId: number;
  supervisorName: string;
} // Untuk form fields

export class OutletFormFactory {
  static createOutletFields(obj: Outlet): OutletFields {
    return {
      customerId: obj.customer.id,
      name: obj.name,
      region: obj.region,
      address: obj.address,
      supervisorId: obj.supervisor.id,
      supervisorName: obj.supervisor.user.name,
    };
  }
  
  static outletMutationFromData({ customerId, name, region, address, supervisorId, supervisorName
  }: OutletFields): OutletMutation {
    return {
      customer: {
        id: customerId,
      },
      name,
      region,
      address,
      supervisor: {
        id: supervisorId,
        user: {
          name: supervisorName,
        }
      },
      technician: {
        id: -1,
        user: {
          name: "-"
        }
      }
    };
  }
}


