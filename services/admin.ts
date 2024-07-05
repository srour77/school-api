import { admin } from "@prisma/client"
import Roles from "../enums/roles"
import jwt from 'jsonwebtoken'
import IDataStore from "../models/IDataStore"

class AdminSerivceProvider {
    private db: IDataStore

    constructor(_db: IDataStore) {
        this.db = _db
    }

    generateAdminToken = (data: Pick<admin, 'id' | 'schoolId'>): string => {
        const { id, schoolId  } = data
        const token = jwt.sign({ id, schoolId, role: Roles.Admin }, process.env.TOKEN_PASS)
        return token
    }
}

export default AdminSerivceProvider