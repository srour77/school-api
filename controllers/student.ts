import { classRoom, student } from "@prisma/client"
import { RequestHandler } from "express"
import Roles from "../enums/roles"
import IDataStore from "../models/IDataStore"
import { StatusCodes } from "http-status-codes"
import StudentServiceProvider from "../services/student"
import ClassRoomServiceProvider from "../services/classRoom"
import joi from 'joi'

class StudentController {
    db: IDataStore
    service: StudentServiceProvider
    constructor(_db: IDataStore) {
        this.db = _db
        this.service = new StudentServiceProvider(this.db)
    }
    
    createStudent: RequestHandler<any, { message: string, status: boolean }, Pick<student, 'name' | 'classRoomId' | 'schoolId'>> = async(req, res, next) => {
        const { [Roles.Client]: { id, schoolId } } = res.locals
        req.body.schoolId = schoolId
        await this.db.createStudent(req.body)
        res.status(StatusCodes.CREATED).json({ message: 'success', status: true })
    }

    getStudent: RequestHandler<{ id: string }, { message: string, status: boolean, student?: Pick<student, 'id' | 'name'> & { classRoom: Pick<classRoom, 'id' | 'classNumber'> } }> = async(req, res, next) => {
        const { [Roles.Client]: { schoolId } } = res.locals
        if(!joi.string().hex().length(24).validate(req.params.id)) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid admin id', status: false })

        if(! await this.service.studentManageableByAdmin(req.params.id, schoolId)) res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid student id', status: false })
    
        const student = await this.db.getStudentById(req.params.id)
        res.status(StatusCodes.CREATED).json({ message: 'success', status: true, student })
    }

    getAllStudents: RequestHandler<any, { message: string, status: boolean, students?: Array<Pick<student, 'id' | 'name'> & { classRoom: Pick<classRoom, 'id' | 'classNumber'> }> }> = async(req, res, next) => {
        const { [Roles.Client]: { schoolId } } = res.locals
        if(!joi.string().hex().length(24).validate(req.params.id)) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid admin id', status: false })

        const students = await this.db.getAllStudents(schoolId)
        res.status(StatusCodes.CREATED).json({ message: 'success', status: true, students })
    }

    updateStudent: RequestHandler<{ id: string }, { message: string, status: boolean }, Pick<student, 'name' | 'classRoomId'>> = async(req, res, next) => {
        const { [Roles.Client]: { schoolId } } = res.locals
        if(!joi.string().hex().length(24).validate(req.params.id)) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid admin id', status: false })

        if(! await this.service.studentManageableByAdmin(req.params.id, schoolId)) res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid student id', status: false })
        
        if(req.body.classRoomId && !await new ClassRoomServiceProvider(this.db).classRoomManageableByAdmin(req.body.classRoomId, schoolId))
            res.status(StatusCodes.OK).json({ message: 'invalid class room id', status: false })

        await this.db.updateStudent(req.params.id, req.body)
        res.status(StatusCodes.CREATED).json({ message: 'success', status: true })
    }

    deleteStudent: RequestHandler<{ id: string }, { message: string, status: boolean }, Pick<student, 'name' | 'classRoomId'>> = async(req, res, next) => {
        const { [Roles.Client]: { schoolId } } = res.locals
        if(!joi.string().hex().length(24).validate(req.params.id)) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid admin id', status: false })

        if(! await this.service.studentManageableByAdmin(req.params.id, schoolId)) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid student id', status: false })

        await this.db.deleteStudent(req.params.id)
        res.status(StatusCodes.CREATED).json({ message: 'success', status: true })
    }
}

export default StudentController