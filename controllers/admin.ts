import { RequestHandler } from "express"
import IDataStore from "../models/IDataStore"
import { admin, school } from "@prisma/client"
import { StatusCodes } from "http-status-codes"
import AdminSerivceProvider from "../services/admin"
import { compare, genSalt, hash } from 'bcryptjs'
import joi from 'joi'


class AdminController {
    private db: IDataStore
    private service: AdminSerivceProvider

    constructor(_db: IDataStore) {
        this.db = _db
        this.service = new AdminSerivceProvider(this.db)
    }

    loginAdmin: RequestHandler<any, { message: string, status: boolean, token?: string }, Pick<admin, 'email' | 'password'>> = async(req, res, next) => {
        const admin = await this.db.getAdminByEmail(req.body.email)
        if(!admin) return res.status(StatusCodes.OK).json({ message: 'no such admin exists', status: false })

        const passwordMatched = await compare(req.body.password, admin.password)
        if(!passwordMatched) return res.status(StatusCodes.OK).json({ message: 'incorect email/password', status: false })

        const token = this.service.generateAdminToken({ id: admin.id, schoolId: admin.schoolId })
        res.status(StatusCodes.CREATED).json({ message: 'success', status: true, token })
    }

    createAdmin: RequestHandler<any, { message: string, status: boolean, token?: string }, Pick<admin, 'email' | 'password' | 'schoolId'>> = async(req, res, next) => {
        req.body.password = await hash(req.body.password, await genSalt(10))
        
        if(await this.db.adminExists(req.body.email)) return res.status(StatusCodes.OK).json({ message: 'admin already exists', status: false })

        const admin = await this.db.createAdmin(req.body)
        const token = this.service.generateAdminToken({ id: admin.id, schoolId: admin.schoolId })   
        res.status(StatusCodes.CREATED).json({ message: 'success', status: true, token })
    }

    getAdminById: RequestHandler<{ id: string }, { message: string, status: boolean, admin?: Pick<admin, 'id' | 'email' | 'schoolId'> }> = async(req, res, next) => {
        if(!joi.string().hex().length(24).validate(req.params.id)) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid admin id', status: false })

        const admin = await this.db.getAdminById(req.params.id)
        res.status(StatusCodes.OK).json({ message: 'success', status: true, admin })
    }

    getAllAdmins: RequestHandler<any, { message: string, status: boolean, admins?: Array<Pick<admin, 'id' | 'email' | 'schoolId'>>}> = async(req, res, next) => {
        const admins = await this.db.getAllAdmins()
        res.status(StatusCodes.OK).json({ message: 'success', status: true, admins })
    }

    updateAdmin: RequestHandler<{ id: string }, { message: string, status: boolean }, Pick<admin, 'password'>> = async(req, res, next) => {
        if(!joi.string().hex().length(24).validate(req.params.id)) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid admin id', status: false })

        await this.db.resetAdminPassword(req.params.id, req.body.password)
        res.status(StatusCodes.OK).json({ message: 'success', status: true })
    }

    deleteAdmin: RequestHandler<{ id: string }, { message: string, status: boolean }> = async(req, res, next) => {
        if(!joi.string().hex().length(24).validate(req.params.id)) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid admin id', status: false })

        await this.db.deleteAdmin(req.params.id)
        res.status(StatusCodes.OK).json({ message: 'success', status: true })
    }
}

export default AdminController