import { RequestHandler } from 'express'
import { StatusCodes } from 'http-status-codes'
import { verify } from 'jsonwebtoken'
import Roles from '../enums/roles'

export const authenticateClient: RequestHandler<any,{ message: string; status: boolean }> = async (req, res, next) => {
  const { headers: { authorization } } = req
  const decoded = getTokenPayload(authorization)
  if (!decoded) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'invalid token', status: false })

  Object.defineProperty(res.locals, Roles.Client, { value: decoded, enumerable: true })
  next()
}

export const authorizeClient = function (authorizedRoles: Roles[]) {
  const fun: RequestHandler<any, { message: string; status: boolean }, any> = async (req, res, next) => {
    const { role } = res.locals[Roles.Client]
    if (role == undefined) return res.status(StatusCodes.UNAUTHORIZED) .json({ message: 'unauthenticated client', status: false })
        
    if (!authorizedRoles.find((r) => r == role)) return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'unathorized client', status: false })
    next()
  }

  return fun
}

function getTokenPayload(authHeader: string) {
  const token = authHeader?.split(' ')[1]

  let decoded
  try {
    decoded = verify(token, process.env.TOKEN_PASS)
  } catch (err) {
    decoded = null
  }

  return decoded
}