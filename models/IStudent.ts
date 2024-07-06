import { classRoom, student } from "@prisma/client";

interface IStudent {
    createStudent(data: Pick<student, 'name' | 'classRoomId'>): Promise<student>;
    getStudentById(id: string): Promise<Pick<student, 'id' | 'name'> & { classRoom: Pick<classRoom, 'id' | 'classNumber'> }>;
    getStudentSchoolId(id: string): Promise<string>;
    getAllStudents(schoolId: string): Promise<Array<Pick<student, 'id' | 'name'> & { classRoom: Pick<classRoom, 'id' | 'classNumber'> }>>;
    updateStudent(id: string, data: Pick<student, 'name' | 'classRoomId'>): Promise<void>;
    deleteStudent(id: string): Promise<void>;
}

export default IStudent