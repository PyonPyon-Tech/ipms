import { User, UserClass } from "@models/user";
import { Outlet } from "../outlet";

export interface Customer {
  id: number;
  user: User;
  contact: string;
  visitationFrequency: number;
  startContract: Date;
  endContract: Date;
  outlets: Outlet[];
}

export interface CustomerMutation {
  user: User;
  contact: string;
  visitationFrequency: number;
  startContract: Date;
  endContract: Date;
}

export class CustomerClass implements Customer {
  id: number;
  user: User;
  contact: string;
  visitationFrequency: number;
  startContract: Date;
  endContract: Date;
  outlets: Outlet[];

  constructor(obj: any) {
    this.id = obj.id;
    this.user = new UserClass(obj.user);
    this.contact = obj.contact,
    this.visitationFrequency = obj.visitationFrequency;
    this.startContract = obj.startContract;
    this.endContract = obj.endContract;
    this.outlets = [...obj.outlets];
  }
} 
