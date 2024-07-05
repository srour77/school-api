import { RequestHandler } from "express";
import IDataStore from "../models/IDataStore";
import { classRoom, school } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import Roles from "../enums/roles";
import ClassRoomServiceProvider from "../services/classRoom";

class ClassRoomController {
    private db: IDataStore
    private service: ClassRoomServiceProvider

    constructor(_db: IDataStore) {
        this.db = _db
        this.service = new ClassRoomServiceProvider(this.db)
    }

    createClassRoom: RequestHandler<any, { message: string, status: boolean }, Pick<classRoom, 'classNumber' | 'schoolId'>> = async(req, res, next) => {
        const { [Roles.Client]: { id, schoolId } } = res.locals
        req.body.schoolId = schoolId
        await this.db.createClassRoom(req.body)
        res.status(StatusCodes.OK).json({ message: 'success', status: true })

    }

    getClassRoomById: RequestHandler<{id: string}, { message: string, status: boolean, classRoom?: classRoom }> = async(req, res, next) => {
        const { [Roles.Client]: { schoolId } } = res.locals
        const id = parseInt(req.params.id)
        if(Number.isNaN(id) || id < 1) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid ClassRoom id', status: false })
        
        if(!await this.service.classRoomManageableByAdmin(id, schoolId)) res.status(StatusCodes.OK).json({ message: 'invalid class room id', status: false })

        const classRoom = await this.db.getClassRoom(id)
        res.status(StatusCodes.OK).json({ message: 'success', status: true, classRoom })
    }

    getAllClassRooms: RequestHandler<any, { message: string, status: boolean, classRooms?: Array<classRoom>}> = async(req, res, next) => {
        const { [Roles.Client]: { schoolId } } = res.locals
        const classRooms = await this.db.getAllClassRooms(schoolId)
        res.status(StatusCodes.OK).json({ message: 'success', status: true, classRooms })
    }

    updateClassRoom: RequestHandler<{ id: string }, { message: string, status: boolean }, Pick<classRoom, 'classNumber'>> = async(req, res, next) => {
        const { [Roles.Client]: { schoolId } } = res.locals
        const id = parseInt(req.params.id)
        if(Number.isNaN(id) || id < 1) res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid ClassRoom id', status: false })

        if(!await this.service.classRoomManageableByAdmin(id, schoolId)) res.status(StatusCodes.OK).json({ message: 'invalid class room id', status: false })
        
        await this.db.updateClassRoom(id, req.body)
        res.status(StatusCodes.OK).json({ message: 'success', status: true })
    }

    deleteClassRoom: RequestHandler<{ id: string }, { message: string, status: boolean }> = async(req, res, next) => {
        const { [Roles.Client]: { schoolId } } = res.locals
        const id = parseInt(req.params.id)
        if(Number.isNaN(id) || id < 1) res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid ClassRoom id', status: false })

        if(!await this.service.classRoomManageableByAdmin(id, schoolId)) res.status(StatusCodes.OK).json({ message: 'invalid class room id', status: false })

        await this.db.deleteClassRoom(id)
        res.status(StatusCodes.OK).json({ message: 'success', status: true })
    }
}

export default ClassRoomController