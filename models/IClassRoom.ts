import { classRoom } from "@prisma/client";

interface IClassRoom {
    createClassRoom(data: Pick<classRoom, 'classNumber' | 'schoolId'>): Promise<void>;

    getClassRoom(id: number): Promise<classRoom>;

    getClassRoom(classNumber: string): Promise<classRoom>;

    getClassRoomSchoolId(id: number): Promise<number>;

    getAllClassRooms(schoolId: number): Promise<Array<classRoom>>;

    updateClassRoom(id: number, data: Pick<classRoom, 'classNumber'>): Promise<void>;

    deleteClassRoom(id: number): Promise<void>;

    classRoomHasStudents(id: number): Promise<boolean>;
}

export default IClassRoom