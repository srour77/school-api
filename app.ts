import express from 'express'
import SchoolRouter from './routes/school'
import SchoolController from './controllers/school'
import IDataStore from './models/IDataStore'
import SchoolDataStore from './models/SchoolDataStore'
import { StatusCodes } from 'http-status-codes'
import errorHandler from './middlewares/errorHandler'
import AdminController from './controllers/admin'
import AdminRouter from './routes/admin'
import ClassRoomRouter from './routes/classRoom'
import ClassRoomController from './controllers/classRoom'
import StudentController from './controllers/student'
import StudentRouter from './routes/student'
import SuperAdminController from './controllers/sueprAdmin'
import SuperAdminRouter from './routes/superAdmin'
import swaggerUi from 'swagger-ui-express'
import docs from './docs/docs.ts'

const app = express()
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs))

const db: IDataStore = new SchoolDataStore()

app.use('/school', new SchoolRouter(new SchoolController(db)).getRouter())
app.use('/admin', new AdminRouter(new AdminController(db)).getRouter())
app.use('/student', new StudentRouter(new StudentController(db)).getRouter())
app.use('/classRoom', new ClassRoomRouter(new ClassRoomController(db)).getRouter())
app.use('/superAdmin', new SuperAdminRouter(new SuperAdminController(db)).getRouter())
app.get('/', (req, res, next) => res.status(200).json('welcome home'))

app.use(errorHandler)
app.use((req, res, next) =>res.status(StatusCodes.NOT_FOUND).json({ message: 'no such resource found' }))

app.listen(process.env.PORT, () => console.log('server is running...'))

export default app