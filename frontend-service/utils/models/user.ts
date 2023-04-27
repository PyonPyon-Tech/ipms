export interface User {
    name: string;
    role: number;
    username: string;
    isActive: number;
    isEmployee: number;
    password?: string;
    uuid: number;
    id: number;
}
export class UserClass implements User{
    name: string;
    role: number;
    username: string;
    isActive: number;
    isEmployee: number;
    uuid: number;
    id: number;

    constructor(obj: any) {
        this.name = obj.name;
        this.role = obj.role;
        this.username = obj.username;
        this.isEmployee = obj.isEmployee;
        this.isActive = obj.isActive;
        this.uuid = obj.uuid;
        this.id = obj.id;
    }
}