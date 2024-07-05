import { classRoom, student } from "@prisma/client"
import { RequestHandler } from "express"
import Roles from "../enums/roles"
import IDataStore from "../models/IDataStore"
import { StatusCodes } from "http-status-codes"
import StudentServiceProvider from "../services/student"
import ClassRoomServiceProvider from "../services/classRoom"

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
        const id = parseInt(req.params.id)
        if(Number.isNaN(id) || id < 1) res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid student id', status: false })
        
        if(! await this.service.studentManageableByAdmin(id, schoolId)) res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid student id', status: false })
    
        const student = await this.db.getStudentById(id)
        res.status(StatusCodes.CREATED).json({ message: 'success', status: true, student })
    }

    getAllStudents: RequestHandler<{ id: string }, { message: string, status: boolean, students?: Array<Pick<student, 'id' | 'name'> & { classRoom: Pick<classRoom, 'id' | 'classNumber'> }> }> = async(req, res, next) => {
        const { [Roles.Client]: { schoolId } } = res.locals
        const id = parseInt(req.params.id)
        if(Number.isNaN(id) || id < 1) res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid student id', status: false })
        const students = await this.db.getAllStudents(id)
        res.status(StatusCodes.CREATED).json({ message: 'success', status: true, students })
    }

    updateStudent: RequestHandler<{ id: string }, { message: string, status: boolean }, Pick<student, 'name' | 'classRoomId'>> = async(req, res, next) => {
        const { [Roles.Client]: { schoolId } } = res.locals
        const id = parseInt(req.params.id)
        if(Number.isNaN(id) || id < 1) res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid student id', status: false })
        
        if(! await this.service.studentManageableByAdmin(id, schoolId)) res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid student id', status: false })
        
        if(req.body.classRoomId && !await new ClassRoomServiceProvider(this.db).classRoomManageableByAdmin(req.body.classRoomId, schoolId))
            res.status(StatusCodes.OK).json({ message: 'invalid class room id', status: false })

        await this.db.updateStudent(id, req.body)
        res.status(StatusCodes.CREATED).json({ message: 'success', status: true })
    }

    deleteStudent: RequestHandler<{ id: string }, { message: string, status: boolean }, Pick<student, 'name' | 'classRoomId'>> = async(req, res, next) => {
        const { [Roles.Client]: { schoolId } } = res.locals
        const id = parseInt(req.params.id)
        if(Number.isNaN(id) || id < 1) res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid student id', status: false })

        if(! await this.service.studentManageableByAdmin(id, schoolId)) res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid student id', status: false })

        await this.db.deleteStudent(id)
        res.status(StatusCodes.CREATED).json({ message: 'success', status: true })
    }
}

export default StudentController