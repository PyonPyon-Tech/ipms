import { Employee, EmployeeMutation } from ".";

export interface EmployeeFields {
  name: string;
  username: string;
  password?: string;
  contact: string;
  address: string;
  birthPlace: string;
  birthDate: string;
  gender: number;
  role: number;
  isActive: number;
} // Untuk form fields

export interface EmployeeAdministrator extends Employee {}

export interface EmployeeAdministratorFields extends EmployeeFields {}

export interface EmployeeSupervisor extends Employee {
  region: string;
}

export interface EmployeeSupervisorFields extends EmployeeFields {
  region: string;
}

export interface EmployeeTechnician extends Employee {
  region: string;
  supervisor: {
    id: number;
  };
}

export interface EmployeeTechnicianFields extends EmployeeFields {
  region: string;
  supervisor: number | string;
}

export class EmployeeFormFactory {
  static createAdminFields(obj: Employee): EmployeeAdministratorFields {
    return {
      address: obj.address,
      contact: obj.contact,
      gender: obj.gender,
      username: obj.user.username,
      name: obj.user.name,
      password: "",
      birthPlace: obj.birthLocation,
      role: obj.user.role,
      isActive: obj.user.isActive,
      birthDate: new Date(obj?.birthDate ?? new Date().toLocaleDateString())
        .toISOString()
        .split("T")[0],
    };
  }

  static createSupervisorFields(obj: Employee): EmployeeSupervisorFields {
    return {
      ...EmployeeFormFactory.createAdminFields(obj),
      region: obj?.region ?? "",
    };
  }

  static createTechnicianFields(obj: Employee): EmployeeTechnicianFields {
    return {
      ...EmployeeFormFactory.createSupervisorFields(obj),
      supervisor: obj?.supervisor?.id ?? -1,
    };
  }

  static employeeMutationFromAdmin({address,birthDate,birthPlace,contact,gender,name,password,role,username, isActive
  }: EmployeeAdministratorFields): EmployeeMutation {
    return {
      address,
      birthLocation: birthPlace,
      birthDate: new Date(birthDate),
      contact,
      gender,
      user: {
        name,
        username,
        role,
        isActive,
        isEmployee: 1,
        password: !!password ? password : undefined,
      },
    };
  }

  static employeeMutationFromSupervisor({
    region,
    ...obj
  }: EmployeeSupervisorFields): EmployeeMutation {
    return {
      ...EmployeeFormFactory.employeeMutationFromAdmin(obj),
      region,
    };
  }

  static employeeMutationFromTechnician({
    supervisor,
    ...obj
  }: EmployeeTechnicianFields): EmployeeMutation {
    return {
      ...EmployeeFormFactory.employeeMutationFromSupervisor(obj),
      supervisor: {
        id: Number(supervisor),
      },
    };
  }
} // untuk post/put


