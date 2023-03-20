import { User, UserClass } from "@models/user";
import { Outlet } from "./outlet";

export interface Customer {
  id: number;
  user: User;
  outlets: Outlet[];
}

export interface CustomerMutation {
  user: User;
}

export class CustomerClass implements Customer {
  id: number;
  user: User;
  outlets: Outlet[];

  constructor(obj: any) {
    this.id = obj.id;
    this.user = new UserClass(obj.user);
    this.outlets = [...obj.outlets];
  }
} 
