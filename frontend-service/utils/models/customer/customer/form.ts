import { Customer, CustomerMutation } from ".";

export interface CustomerFields {
  name: string;
  username: string;
  password?: string;
  role: number;
  isActive: number;
} // Untuk form fields

export class CustomerFormFactory {
  static createCustomerFields(obj: Customer): CustomerFields {
    return {
      username: obj.user.username,
      name: obj.user.name,
      password: "",
      role: obj.user.role,
      isActive: obj.user.isActive,
    };
  }
  
  static customerMutationFromData({ name, password, role, username, isActive
  }: CustomerFields): CustomerMutation {
    return {
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


