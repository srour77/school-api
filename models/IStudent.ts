import { classRoom, student } from "@prisma/client";

interface IStudent {
    createStudent(data: Pick<student, 'name' | 'classRoomId'>): Promise<student>;
    getStudentById(id: number): Promise<Pick<student, 'id' | 'name'> & { classRoom: Pick<classRoom, 'id' | 'classNumber'> }>;
    getStudentSchoolId(id: number): Promise<number>;
    getAllStudents(schoolId: number): Promise<Array<Pick<student, 'id' | 'name'> & { classRoom: Pick<classRoom, 'id' | 'classNumber'> }>>;
    updateStudent(id: number, data: Pick<student, 'name' | 'classRoomId'>): Promise<void>;
    deleteStudent(id: number): Promise<void>;
}

export default IStudent