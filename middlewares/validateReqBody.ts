import { Request, Response, NextFunction } from 'express'
import { StatusCodes } from 'http-status-codes'
import { ObjectSchema } from 'joi'

const validateRequestBody = (schema: ObjectSchema) =>
  (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body)
    if (error) {
      return res.status(StatusCodes.BAD_REQUEST).json({ error: error.details[0].message.replace(/"/g, '') })
    }

    next()
  }

export default validateRequestBody