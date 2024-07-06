import { Router } from "express";
import { authenticateClient, authorizeClient } from "../middlewares/auth";
import Roles from "../enums/roles";
import validateRequestBody from "../middlewares/validateReqBody";
import SuperAdminController from "../controllers/sueprAdmin";
import { createSuperAdminSchema } from "../validators/superAdmin";

class SuperAdminRouter {
    private controller: SuperAdminController
    private router: Router

    constructor(_controller: SuperAdminController) {
        this.router = Router()
        this.controller = _controller
        this.buildRoutes()
    }

    buildRoutes(): void {
        this.router.post('/create', validateRequestBody(createSuperAdminSchema), this.controller.createSuperAdmin)
        this.router.post('/login', validateRequestBody(createSuperAdminSchema), this.controller.loginSuperAdmin)
    }

    getRouter(): Router {
        return this.router
    }
}

export default SuperAdminRouter