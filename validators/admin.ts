import { admin } from '@prisma/client'
import joi from 'joi'

export const createAdminSchema = joi.object<Pick<admin, 'email' | 'password' | 'schoolId'>>({
    email: joi.string().email().required(),
    password: joi.string().required(),
    schoolId: joi.string().hex().length(24).required()
})

export const loginAdminSchema = joi.object<Pick<admin, 'email' | 'password'>>({
    email: joi.string().email().required(),
    password: joi.string().required()
})

export const updateAdminSchema = joi.object<Pick<admin, 'password'>>({
    password: joi.string().required()
})