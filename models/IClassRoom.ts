import { classRoom } from "@prisma/client";

interface IClassRoom {
    createClassRoom(data: Pick<classRoom, 'classNumber' | 'schoolId'>): Promise<void>;

    getClassRoom(id: string): Promise<classRoom>;

    getClassRoomSchoolId(id: string): Promise<string>;

    getAllClassRooms(schoolId: string): Promise<Array<classRoom>>;

    updateClassRoom(id: string, data: Pick<classRoom, 'classNumber'>): Promise<void>;

    deleteClassRoom(id: string): Promise<void>;

    classRoomHasStudents(id: string): Promise<boolean>;
}

export default IClassRoom