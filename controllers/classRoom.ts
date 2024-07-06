import { RequestHandler } from "express";
import IDataStore from "../models/IDataStore";
import { classRoom, school } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import Roles from "../enums/roles";
import ClassRoomServiceProvider from "../services/classRoom";
import joi from 'joi'

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
        
        if(!joi.string().hex().length(24).validate(req.params.id)) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid admin id', status: false })

        if(!await this.service.classRoomManageableByAdmin(req.params.id, schoolId)) return res.status(StatusCodes.OK).json({ message: 'invalid class room id', status: false })

        const classRoom = await this.db.getClassRoom(req.params.id)
        res.status(StatusCodes.OK).json({ message: 'success', status: true, classRoom })
    }

    getAllClassRooms: RequestHandler<any, { message: string, status: boolean, classRooms?: Array<classRoom>}> = async(req, res, next) => {
        const { [Roles.Client]: { schoolId } } = res.locals
        const classRooms = await this.db.getAllClassRooms(schoolId)
        res.status(StatusCodes.OK).json({ message: 'success', status: true, classRooms })
    }

    updateClassRoom: RequestHandler<{ id: string }, { message: string, status: boolean }, Pick<classRoom, 'classNumber'>> = async(req, res, next) => {
        const { [Roles.Client]: { schoolId } } = res.locals

        if(!await this.service.classRoomManageableByAdmin(req.params.id, schoolId)) return res.status(StatusCodes.OK).json({ message: 'invalid class room id', status: false })
        
        await this.db.updateClassRoom(req.params.id, req.body)
        res.status(StatusCodes.OK).json({ message: 'success', status: true })
    }

    deleteClassRoom: RequestHandler<{ id: string }, { message: string, status: boolean }> = async(req, res, next) => {
        const { [Roles.Client]: { schoolId } } = res.locals

        if(!joi.string().hex().length(24).validate(req.params.id)) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid admin id', status: false })

        if(!await this.service.classRoomManageableByAdmin(req.params.id, schoolId)) return res.status(StatusCodes.OK).json({ message: 'invalid class room id', status: false })
        
        if(await this.db.classRoomHasStudents(req.params.id)) return res.status(StatusCodes.OK).json({ message: 'class room can not be deleted, unassign the associated students first', status: false })

        await this.db.deleteClassRoom(req.params.id)
        res.status(StatusCodes.OK).json({ message: 'success', status: true })
    }
}

export default ClassRoomController