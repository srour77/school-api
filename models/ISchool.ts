import { school } from "@prisma/client";

interface ISchool {
    createSchool(data: Pick<school, 'name' | 'manager'>): Promise<void>;
    updateSchool(id: string, data: Pick<school, 'name' | 'manager'>): Promise<void>;
    deleteSchool(id: string): Promise<void>;
    getSchoolById(id: string): Promise<school | null>;
    getAllSchools(): Promise<Array<school>>;
}

export default ISchool