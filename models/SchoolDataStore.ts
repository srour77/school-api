import { PrismaClient, admin, classRoom, school, student, superAdmin } from "@prisma/client";
import IDataStore from "./IDataStore";

class SchoolDataStore implements IDataStore {
    db: PrismaClient

    constructor() {
        this.db = new PrismaClient()
    }

    async createSuperAdmin(data: Pick<superAdmin, "email" | "password">): Promise<superAdmin> {
        const superAdmin = await this.db.superAdmin.create({ data })
        return superAdmin
    }

    async superAdminExists(email: string): Promise<boolean> {
        return await this.db.superAdmin.findFirst({ where: { email }}) ? true : false
    }

    async getSuperAdmin(email: string): Promise<superAdmin | null> {
        const sueprAdmin = await this.db.superAdmin.findFirst({ where: { email }})
        return sueprAdmin || null
    }

    async createSchool(data: Pick<school, "name" | "manager">): Promise<void> {
        await this.db.school.create({ data })
    }

    async updateSchool(id: number, data: Pick<school, "name" | "manager">): Promise<void> {
        await this.db.school.update({ where: { id }, data })
    }

    async deleteSchool(id: number): Promise<void> {
        await this.db.school.delete({ where: { id } })
    }

    async getSchoolById(id: number): Promise<school | null> {
        const school = await this.db.school.findUnique({ where: { id } })
        return school
    }

    async getAllSchools(): Promise<Array<school>> {
        const schools = await this.db.school.findMany()
        return schools
    }

    async createAdmin(data: Pick<admin, "email" | "password" | "schoolId">): Promise<admin> {
        const admin = await this.db.admin.create({ data })
        return admin
    }

    async getAdminById(id: number): Promise<Pick<admin, "email" | "id" | "schoolId">> {
        const admin = await this.db.admin.findUnique({ where: { id }, select: { id: true, email: true, schoolId: true }})
        return admin
    }

    async getAdminByEmail(email: string): Promise<Pick<admin, 'id' | 'schoolId' | "email" | "password">> {
        const admin =  await this.db.admin.findFirst({ where: { email }, select: { id: true, schoolId: true, email: true, password: true } })
        return admin
    }

    async adminExists(email: string): Promise<boolean> {
        const admin = await this.db.admin.findFirst({ where: { email }})
        return admin ? true : false
    }

    async getAllAdmins(): Promise<Array<Pick<admin, "email" | "id" | "schoolId">>> {
        const admins = await this.db.admin.findMany()
        return admins
    }

    async resetAdminPassword(id: number, password: string): Promise<void> {
        await this.db.admin.update({ where: { id }, data: { password }})
    }

    async deleteAdmin(id: number): Promise<void> {
        await this.db.admin.delete({ where: { id }})
    }

    async createStudent(data: Pick<student, "name" | "classRoomId" | "schoolId">): Promise<student> {
        const student = await this.db.student.create({ data })
        return student
    }

    async getStudentById(id: number): Promise<Pick<student, "id" | "name"> & { classRoom: Pick<classRoom, "id" | "classNumber">; }> {
        const student = await this.db.student.findUnique({ where: { id }, select: { id: true, name: true, classRoom: { select: { id: true, classNumber: true }} } })
        return student
    }

    async getStudentSchoolId(id: number): Promise<number> {
        const student = await this.db.student.findUnique({ where: { id }, select: { schoolId: true }})
        return student?.schoolId
    }

    async getAllStudents(schoolId: number): Promise<Array<Pick<student, "id" | "name"> & { classRoom: Pick<classRoom, "id" | "classNumber">; }>> {
        const students = await this.db.student.findMany({ where: { schoolId }, select: { id: true, name: true, classRoom: { select: { id: true, classNumber: true } } } })
        return students
    }

    async updateStudent(id: number, data: Pick<student, "name" | "classRoomId">): Promise<void> {
        const { name, classRoomId } = data
        await this.db.student.update({ where: {id }, data: { name, classRoomId } })
    }

    async deleteStudent(id: number): Promise<void> {
        await this.db.student.delete({ where: { id }})
    }

    async createClassRoom(data: Pick<classRoom, "classNumber" | "schoolId">): Promise<void> {
        await this.db.classRoom.create({ data })
    }

    getClassRoom(id: number): Promise<classRoom>;
    getClassRoom(classNumber: string): Promise<classRoom>;
    async getClassRoom(id: unknown): Promise<classRoom> {
        let classRoom
        if(typeof id == 'number') {
            classRoom = await this.db.classRoom.findUnique({ where: { id }})
        } else {
            classRoom = await this.db.classRoom.findFirst({ where: { classNumber: id }})
        }

        return classRoom
    }

    async getClassRoomSchoolId(id: number): Promise<number> {
        const classRoom = await this.db.classRoom.findUnique({ where: { id }, select: { schoolId: true } })
        return classRoom?.schoolId
    }

    async getAllClassRooms(schoolId: number): Promise<Array<classRoom>> {
        const classRooms = await this.db.classRoom.findMany({ where: { schoolId }})
        return classRooms
    }

    async updateClassRoom(id: number, data: Pick<classRoom, "classNumber">): Promise<void> {
        await this.db.classRoom.update({ where: { id }, data })
    }

    async deleteClassRoom(id: number): Promise<void> {
        await this.db.classRoom.delete({ where: { id }})
    }

    async classRoomHasStudents(id: number): Promise<boolean> {
        const classRooms = await this.db.classRoom.findUnique({ where: { id } , select: { _count: { select: { students: true } } } })
        return classRooms._count.students == 0 ? false : true 
    }
}

export default SchoolDataStore