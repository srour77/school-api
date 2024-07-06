import { RequestHandler } from "express";
import IDataStore from "../models/IDataStore";
import { school } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import joi from 'joi'

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
        if(!joi.string().hex().length(24).validate(req.params.id)) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid admin id', status: false })

        const school = await this.db.getSchoolById(req.params.id)
        res.status(StatusCodes.OK).json({ message: 'success', status: true, school })
    }

    getAllSchools: RequestHandler<any, { message: string, status: boolean, schools?: Array<school>}> = async(req, res, next) => {
        const schools = await this.db.getAllSchools()
        res.status(StatusCodes.OK).json({ message: 'success', status: true, schools })
    }

    updateSchool: RequestHandler<{ id: string }, { message: string, status: boolean }, Pick<school, 'name'| 'manager'>> = async(req, res, next) => {
        if(!joi.string().hex().length(24).validate(req.params.id)) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid admin id', status: false })

        if(!joi.string().hex().length(24).validate(req.params.id)) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid admin id', status: false })

        await this.db.updateSchool( req.params.id, req.body)
        res.status(StatusCodes.OK).json({ message: 'success', status: true })
    }

    deleteSchool: RequestHandler<{ id: string }, { message: string, status: boolean }> = async(req, res, next) => {
        if(!joi.string().hex().length(24).validate(req.params.id)) return res.status(StatusCodes.BAD_REQUEST).json({ message: 'invalid admin id', status: false })

        await this.db.deleteSchool(req.params.id)
        res.status(StatusCodes.OK).json({ message: 'success', status: true })
    }
}

export default SchoolController