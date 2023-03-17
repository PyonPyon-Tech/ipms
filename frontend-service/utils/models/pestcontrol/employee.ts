import { User, UserClass } from "@models/user";

export interface Employee {
    id: number;
    user: User;
    birthDate: Date;
    birthLocation: string;
    gender: number;
    address: string;
    contact: string;
    lastLogin: Date;
}

export class EmployeeClass implements Employee {
  id: number;
  user: User;
  birthDate: Date;
  birthLocation: string;
  gender: number;
  address: string;
  contact: string;
  lastLogin: Date;
  constructor(
obj: any
  ) {
    this.id = obj.id;
    this.user = new UserClass(obj.user);
    this.birthDate = obj.birthDate;
    this.birthLocation = obj.birthLocation;
    this.gender = obj.gender;
    this.address = obj.address;
    this.contact = obj.contact;
    this.lastLogin = obj.lastLogin;
  }
}
