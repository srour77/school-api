import { RequestHandler } from "express";
import IDataStore from "../models/IDataStore";
import { school } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import Roles from "../enums/roles";

class SchoolController {
    private db: IDataStore
    
    constructor(_db: IDataStore) {
        this.db = _db
    }

    createSchool: RequestHandler<any, { message: string, status: boolean }, Pick<school, 'name' | 'manager'>> = async(req, res, next) => {
        await this.db.createSchool(req.body)
        res.status(StatusCodes.OK).json({ message: 'success', status: true })

    }

    getSchoolById: RequestHandler<{id: string}, { message: string, status: boolean, school?: school }> = async(req, res, next) => {
        const id = parseInt(req.params.id)
        if(Number.isNaN(id) || id < 1) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid school id', status: false })
        const school = await this.db.getSchoolById(id)
        res.status(StatusCodes.OK).json({ message: 'success', status: true, school })
    }

    getAllSchools: RequestHandler<any, { message: string, status: boolean, schools?: Array<school>}> = async(req, res, next) => {
        const schools = await this.db.getAllSchools()
        res.status(StatusCodes.OK).json({ message: 'success', status: true, schools })
    }

    updateSchool: RequestHandler<{ id: string }, { message: string, status: boolean }, Pick<school, 'name'| 'manager'>> = async(req, res, next) => {
        const schoolId = parseInt(req.params.id)
        if(Number.isNaN(schoolId) || schoolId < 1) res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid school id', status: false })
        await this.db.updateSchool(schoolId, req.body)
        res.status(StatusCodes.OK).json({ message: 'success', status: true })
    }

    deleteSchool: RequestHandler<{ id: string }, { message: string, status: boolean }> = async(req, res, next) => {
        const schoolId = parseInt(req.params.id)
        if(Number.isNaN(schoolId) || schoolId < 1) res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid school id', status: false })
        await this.db.deleteSchool(schoolId)
        res.status(StatusCodes.OK).json({ message: 'success', status: true })
    }
}

export default SchoolController