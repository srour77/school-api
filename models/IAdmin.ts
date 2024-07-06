import { admin } from "@prisma/client";

interface IAdmin {
    createAdmin(data: Pick<admin, 'email' | 'password' | 'schoolId'>): Promise<admin>;
    getAdminById(id: string): Promise<Pick<admin, 'email' | 'id' | 'schoolId'>>;
    getAdminByEmail(email: string): Promise<Pick<admin, 'id' | 'schoolId' | 'email' | 'password'>>;
    adminExists(email: string): Promise<boolean>;
    getAllAdmins(): Promise<Array<Pick<admin, 'email' | 'id' | 'schoolId'>>>;
    resetAdminPassword(id: string,  password: string): Promise<void>;
    deleteAdmin(id: string): Promise<void>;
}

export default IAdmin