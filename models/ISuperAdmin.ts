import { superAdmin } from "@prisma/client";

interface ISuperAdmin {
    createSuperAdmin(data: Pick<superAdmin, 'email' | 'password'>): Promise<superAdmin>;
    superAdminExists(email: string): Promise<boolean>;
}

export default ISuperAdmin