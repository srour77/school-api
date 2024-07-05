import { classRoom } from '@prisma/client'
import joi from 'joi'

export const createClassRoomSchema = joi.object<Pick<classRoom, 'classNumber'>>({
    classNumber: joi.string().required()
})

export const updateClassRoomSchema = joi.object<Pick<classRoom, 'classNumber'>>({
    classNumber: joi.string()
})