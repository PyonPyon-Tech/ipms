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
export interface EmployeeSupervisor extends Employee {
  region: string;
}
export interface EmployeeTechnician extends EmployeeSupervisor{
  supervisor: number;
}
export type Employees = Employee | EmployeeSupervisor | EmployeeTechnician

export interface EmployeeFields{
  name: string;
  username: string;
  password: string;
  contact: string;
  address: string;
  birthPlace: string;
  birthDate: string;
  gender: number;
  role: number;
  region?: string;
  supervisor?: number;
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
    this.birthDate = new Date(obj.birthDate);
    this.birthLocation = obj.birthLocation;
    this.gender = obj.gender;
    this.address = obj.address;
    this.contact = obj.contact;
    this.lastLogin = new Date(obj.lastLogin);
    console.log(this.birthDate)
  }
}
