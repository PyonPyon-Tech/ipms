export interface User {
    name: string;
    role: number;
    username: string;
    isActive: number;
    isEmployee: number;
    password?: string;
    account?: Account
}
export interface Account {
    id: number;
}
export class UserClass implements User{
    name: string;
    role: number;
    username: string;
    isActive: number;
    isEmployee: number;

    constructor(obj: any) {
        this.name = obj.name;
        this.role = obj.role;
        this.username = obj.username;
        this.isEmployee = obj.isEmployee;
        this.isActive = obj.isActive;
    }
}