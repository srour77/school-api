import { Router } from "express";
import { authenticateClient, authorizeClient } from "../middlewares/auth";
import Roles from "../enums/roles";
import validateRequestBody from "../middlewares/validateReqBody";
import StudentController from "../controllers/student";
import { createStudentSchema, updateStudentSchema } from "../validators/student";

class StudentRouter {
    private controller: StudentController
    private router: Router

    constructor(_controller: StudentController) {
        this.router = Router()
        this.controller = _controller
        this.buildRoutes()
    }

    buildRoutes(): void {
        this.router.post('/create', authenticateClient, authorizeClient([Roles.Admin]), validateRequestBody(createStudentSchema), this.controller.createStudent)
        this.router.get('/get/:id', authenticateClient, authorizeClient([Roles.Admin]), this.controller.getStudent)
        this.router.get('/getAll', authenticateClient, authorizeClient([Roles.Admin]), this.controller.getAllStudents)
        this.router.put('/update/:id', authenticateClient, authorizeClient([Roles.Admin]), validateRequestBody(updateStudentSchema), this.controller.updateStudent)
        this.router.delete('/delete/:id', authenticateClient, authorizeClient([Roles.Admin]), this.controller.deleteStudent)
    }

    getRouter(): Router {
        return this.router
    }
}

export default StudentRouter