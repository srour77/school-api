import { Router } from "express";
import { authenticateClient, authorizeClient } from "../middlewares/auth";
import Roles from "../enums/roles";
import validateRequestBody from "../middlewares/validateReqBody";
import AdminController from "../controllers/admin";
import { createAdminSchema, loginAdminSchema } from "../validators/admin";

class AdminRouter {
    private controller: AdminController
    private router: Router

    constructor(_controller: AdminController) {
        this.router = Router()
        this.controller = _controller
        this.buildRoutes()
    }

    buildRoutes(): void {
        this.router.post('/login', validateRequestBody(loginAdminSchema), this.controller.loginAdmin)
        this.router.post('/create', authenticateClient, authorizeClient([Roles.SuperAdmin]), validateRequestBody(createAdminSchema), this.controller.createAdmin)
        this.router.get('/get/:id', authenticateClient, authorizeClient([Roles.SuperAdmin]), this.controller.getAdminById)
        this.router.get('/getAll', authenticateClient, authorizeClient([Roles.SuperAdmin]), this.controller.getAllAdmins)
        this.router.put('/update/:id', authenticateClient, authorizeClient([Roles.SuperAdmin]), this.controller.updateAdmin)
        this.router.delete('/delete/:id', authenticateClient, authorizeClient([Roles.SuperAdmin]), this.controller.deleteAdmin)
    }

    getRouter(): Router {
        return this.router
    }
}

export default AdminRouter