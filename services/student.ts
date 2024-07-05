import IDataStore from "../models/IDataStore"

class StudentServiceProvider {
    private db: IDataStore

    constructor(_db: IDataStore) {
        this.db = _db
    }
    
    async studentManageableByAdmin(studentId, adminSchoolId): Promise<boolean> {
        return await this.db.getStudentSchoolId(studentId) != adminSchoolId ? false : true
    }
}

export default StudentServiceProvider