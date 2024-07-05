import { Router } from "express";
import SchoolController from "../controllers/school";
import { authenticateClient, authorizeClient } from "../middlewares/auth";
import Roles from "../enums/roles";
import validateRequestBody from "../middlewares/validateReqBody";
import { createSchoolSchema, updateSchoolSchema } from "../validators/school";

class SchoolRouter {
    private controller: SchoolController
    private router: Router

    constructor(_controller: SchoolController) {
        this.router = Router()
        this.controller = _controller
        this.buildRoutes()
    }

    buildRoutes(): void {
        this.router.post('/create', authenticateClient, authorizeClient([Roles.SuperAdmin]), validateRequestBody(createSchoolSchema), this.controller.createSchool)
        this.router.get('/get/:id', authenticateClient, authorizeClient([Roles.SuperAdmin]), this.controller.getSchoolById)
        this.router.get('/getAll', authenticateClient, authorizeClient([Roles.SuperAdmin]), this.controller.getAllSchools)
        this.router.put('/update/:id', authenticateClient, authorizeClient([Roles.SuperAdmin]), validateRequestBody(updateSchoolSchema), this.controller.updateSchool)
        this.router.delete('/delete/:id', authenticateClient, authorizeClient([Roles.SuperAdmin]), this.controller.deleteSchool)
    }

    getRouter(): Router {
        return this.router
    }
}

export default SchoolRouter