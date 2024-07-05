import { RequestHandler } from "express"
import IDataStore from "../models/IDataStore"
import { admin, superAdmin } from "@prisma/client"
import { StatusCodes } from "http-status-codes"
import { genSalt, hash } from 'bcrypt'
import jwt from 'jsonwebtoken'

class SuperAdminController {
    private db: IDataStore

    constructor(_db: IDataStore) {
        this.db = _db
    }

    createSuperAdmin: RequestHandler<any, { message: string, status: boolean, token?: string }, Pick<superAdmin, 'email' | 'password'>> = async(req, res, next) => {
        if(await this.db.superAdminExists(req.body.email)) return res.status(StatusCodes.OK).json({ message: 'super admin already exists', status: false })

        req.body.password = await hash(req.body.password, await genSalt(10))
        const superAdmin = await this.db.createSuperAdmin(req.body)
        const token = jwt.sign({ id: superAdmin.id }, process.env.TOKEN_PASS)
        res.status(StatusCodes.CREATED).json({ message: 'success', status: true, token })
    }
}

export default SuperAdminController