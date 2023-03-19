import { Customer, CustomerMutation } from ".";

export interface CustomerFields {
  name: string;
  username: string;
  password?: string;
  role: number;
} // Untuk form fields

export class CustomerFormFactory {
  static createCustomerFields(obj: Customer): CustomerFields {
    return {
      username: obj.user.username,
      name: obj.user.name,
      password: "",
      role: obj.user.role,
    };
  }
  
  static customerMutationFromData({ name, password, role, username,
  }: CustomerFields): CustomerMutation {
    return {
      user: {
        name,
        username,
        role,
        isActive: 1,
        isEmployee: 0,
        password: !!password ? password : undefined,
      },
    };
  }
}


