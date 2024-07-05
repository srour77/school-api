import { school } from '@prisma/client'
import joi from 'joi'

export const createSchoolSchema = joi.object<Pick<school, 'name' | 'manager'>>({
    name: joi.string().required(),
    manager: joi.string().required(),
})

export const updateSchoolSchema = joi.object<Pick<school, 'name' | 'manager'>>({
    name: joi.string(),
    manager: joi.string()
})