import { admin } from "@prisma/client";

interface IAdmin {
    createAdmin(data: Pick<admin, 'email' | 'password' | 'schoolId'>): Promise<admin>;
    getAdminById(id: number): Promise<Pick<admin, 'email' | 'id' | 'schoolId'>>;
    adminExists(email: string): Promise<boolean>;
    getAllAdmins(): Promise<Array<Pick<admin, 'email' | 'id' | 'schoolId'>>>;
    resetAdminPassword(id: number,  password: string): Promise<void>;
    deleteAdmin(id: number): Promise<void>;
}

export default IAdmin