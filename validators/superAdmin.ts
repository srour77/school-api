import { superAdmin } from '@prisma/client'
import joi from 'joi'

export const createSuperAdminSchema = joi.object<Pick<superAdmin, 'email' | 'password'>>({
    email: joi.string().email().required(),
    password: joi.string().required()
})