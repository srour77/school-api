import IDataStore from "../models/IDataStore"

class ClassRoomServiceProvider {
    private db: IDataStore

    constructor(_db: IDataStore) {
        this.db = _db
    }
    
    async classRoomManageableByAdmin(classRoomId: number, adminSchoolId: number): Promise<boolean> {
        return await this.db.getClassRoomSchoolId(classRoomId) != adminSchoolId ? false : true
    }
}

export default ClassRoomServiceProvider