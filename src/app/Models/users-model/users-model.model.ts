import { Role } from '../roles.enum';
export class UsersModel {
    userId!: number;
    firstLastName!: string;
    phoneNumber!: string;
    email!: string;
    username!: string;
    password!: string;
    latitude!: number;
    longitude!: number;
    isAdmin!: string;
    profilePhoto!: File;
    // role!: Role;
}
