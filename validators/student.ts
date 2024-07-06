import { student } from '@prisma/client'
import joi from 'joi'

export const createStudentSchema = joi.object<Pick<student, 'name' | 'classRoomId'>>({
    name: joi.string().required(),
    classRoomId: joi.string().hex().length(24).required()
})

export const updateStudentSchema = joi.object<Pick<student, 'name' | 'classRoomId'>>({
    name: joi.string(),
    classRoomId: joi.string().hex().length(24)
})