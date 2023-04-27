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
  region?: string;
  supervisor?: {
    id: number;
  };
}

export interface EmployeeMutation {
  user: User;
  birthDate: Date;
  birthLocation: string;
  gender: number;
  address: string;
  contact: string;
  region?: string;
  supervisor?: {
    id: number;
  };
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
  region: string;
  supervisor: { id: number };
  constructor(obj: any) {
    this.id = obj.id;
    this.user = new UserClass(obj.user);
    this.birthDate = new Date(obj.birthDate);
    this.birthLocation = obj.birthLocation;
    this.gender = obj.gender;
    this.address = obj.address;
    this.contact = obj.contact;
    this.lastLogin = new Date(obj.lastLogin);
    this.region = obj.region || "";
    this.supervisor = {
      id: obj?.supervisor?.id ?? -1,
    };
  }
} // untuk get
