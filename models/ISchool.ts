import { school } from "@prisma/client";

interface ISchool {
    createSchool(data: Pick<school, 'name' | 'manager'>): Promise<void>;
    updateSchool(id: number, data: Pick<school, 'name' | 'manager'>): Promise<void>;
    deleteSchool(id: number): Promise<void>;
    getSchoolById(id: number): Promise<school | null>;
    getAllSchools(): Promise<Array<school>>;
}

export default ISchool