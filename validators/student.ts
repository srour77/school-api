import { student } from '@prisma/client'
import joi from 'joi'

export const createStudentSchema = joi.object<Pick<student, 'name' | 'classRoomId'>>({
    name: joi.string().required(),
    classRoomId: joi.number().integer().required()
})

export const updateStudentSchema = joi.object<Pick<student, 'name' | 'classRoomId'>>({
    name: joi.string(),
    classRoomId: joi.number().integer()
})