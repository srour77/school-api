import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'

const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction ) => {
  console.log(err)
  const statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  const message = 'something went wrong, pls try again'
  res.status(statusCode).json({ message, status: false })
}

export default errorHandler