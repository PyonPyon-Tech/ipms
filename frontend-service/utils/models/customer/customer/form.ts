import { Customer, CustomerMutation } from ".";

export interface CustomerFields {
  name: string;
  username: string;
  password?: string;
  role: number;
  contact: string;
  visitationFrequency: number;
  startContract: Date;
  endContract: Date;
  isActive: number;
} // Untuk form fields

export class CustomerFormFactory {
  static createCustomerFields(obj: Customer): CustomerFields {
    return {
      username: obj.user.username,
      name: obj.user.name,
      password: "",
      role: obj.user.role,
      contact: obj.contact,
      visitationFrequency: obj.visitationFrequency,
      startContract: obj.startContract,
      endContract: obj.endContract,
      isActive: obj.user.isActive,
    };
  }
  
  static customerMutationFromData({ name, password, role, username, contact, visitationFrequency, startContract, endContract, isActive
  }: CustomerFields): CustomerMutation {
    return {
      contact: contact,
      visitationFrequency: visitationFrequency,
      startContract: startContract,
      endContract: endContract,
      user: {
        name,
        username,
        role,
        isActive,
        isEmployee: 0,
        password: !!password ? password : undefined,
      },
    };
  }
}


