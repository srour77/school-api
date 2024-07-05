import { Router } from "express";
import { authenticateClient, authorizeClient } from "../middlewares/auth";
import Roles from "../enums/roles";
import validateRequestBody from "../middlewares/validateReqBody";
import { createClassRoomSchema, updateClassRoomSchema } from "../validators/classRoom";
import ClassRoomController from "../controllers/classRoom";

class ClassRoomRouter {
    private controller: ClassRoomController
    private router: Router

    constructor(_controller: ClassRoomController) {
        this.router = Router()
        this.controller = _controller
        this.buildRoutes()
    }

    buildRoutes(): void {
        this.router.post('/create', authenticateClient, authorizeClient([Roles.Admin]), validateRequestBody(createClassRoomSchema), this.controller.createClassRoom)
        this.router.get('/get/:id', authenticateClient, authorizeClient([Roles.Admin]), this.controller.getClassRoomById)
        this.router.get('/getAll', authenticateClient, authorizeClient([Roles.Admin]), this.controller.getAllClassRooms)
        this.router.put('/update/:id', authenticateClient, authorizeClient([Roles.Admin]), validateRequestBody(updateClassRoomSchema), this.controller.updateClassRoom)
        this.router.delete('/delete/:id', authenticateClient, authorizeClient([Roles.Admin]), this.controller.deleteClassRoom)
    }

    getRouter(): Router {
        return this.router
    }
}

export default ClassRoomRouter