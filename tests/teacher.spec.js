const { expect } = require('chai')
const sinon = require('sinon')

const CreateTeacherUseCase = require('../app/application/usecases/teacher/create-teacher.usecase')
const FindTeachersUseCase = require('../app/application/usecases/teacher/find-teachers.usecase')
const GetTeacherByIdUseCase = require('../app/application/usecases/teacher/get-teacher-by-id.usecase')
const UpdateTeacherUseCase = require('../app/application/usecases/teacher/update-teacher.usecase')
const DeleteTeacherUseCase = require('../app/application/usecases/teacher/delete-teacher.usecase')

describe('Teacher Use Cases', () => {
    let mockTeacherService
    let teacherId = 'test-teacher-id'

    beforeEach(() => {
        mockTeacherService = {
            createTeacher: sinon.stub(),
            findTeachers: sinon.stub(),
            getTeacherById: sinon.stub(),
            updateTeacher: sinon.stub(),
            deleteTeacher: sinon.stub()
        }
    })

    afterEach(() => {
        sinon.restore()
    })

    describe('CreateTeacherUseCase', () => {
        it('should create a new teacher successfully', async () => {
            const teacherData = { name: 'Test Teacher', age: 35, degree: 'Masters in Education', status: true }
            const createdTeacher = { id: teacherId, ...teacherData }
            mockTeacherService.createTeacher.resolves(createdTeacher)

            const useCase = new CreateTeacherUseCase(mockTeacherService)
            const result = await useCase.execute(teacherData)

            expect(result.success).to.be.true
            expect(result.data).to.have.property('id', teacherId)
            expect(result.data).to.have.property('name', 'Test Teacher')
            expect(mockTeacherService.createTeacher.calledOnceWith(teacherData)).to.be.true
        })

        it('should fail when name is missing', async () => {
            const useCase = new CreateTeacherUseCase(mockTeacherService)
            const result = await useCase.execute({ age: 35, degree: 'Masters' })

            expect(result.success).to.be.false
            expect(result.isValidationError).to.be.true
        })
    })

    describe('FindTeachersUseCase', () => {
        it('should return all teachers', async () => {
            const teachers = [
                { id: '1', name: 'Teacher 1', age: 35 },
                { id: '2', name: 'Teacher 2', age: 40 }
            ]
            mockTeacherService.findTeachers.resolves(teachers)

            const useCase = new FindTeachersUseCase(mockTeacherService)
            const result = await useCase.execute({})

            expect(result.success).to.be.true
            expect(result.data).to.be.an('array').with.lengthOf(2)
        })
    })

    describe('GetTeacherByIdUseCase', () => {
        it('should get a teacher by id', async () => {
            const teacher = { id: teacherId, name: 'Test Teacher', age: 35 }
            mockTeacherService.getTeacherById.resolves(teacher)

            const useCase = new GetTeacherByIdUseCase(mockTeacherService)
            const result = await useCase.execute({ id: teacherId })

            expect(result.success).to.be.true
            expect(result.data).to.have.property('name', 'Test Teacher')
            expect(mockTeacherService.getTeacherById.calledOnceWith(teacherId)).to.be.true
        })

        it('should fail when id is missing', async () => {
            const useCase = new GetTeacherByIdUseCase(mockTeacherService)
            const result = await useCase.execute({})

            expect(result.success).to.be.false
            expect(result.isValidationError).to.be.true
        })
    })

    describe('UpdateTeacherUseCase', () => {
        it('should update a teacher successfully', async () => {
            const updateData = { id: teacherId, data: { name: 'Updated Teacher', age: 36 } }
            const updatedTeacher = { id: teacherId, name: 'Updated Teacher', age: 36 }
            mockTeacherService.updateTeacher.resolves(updatedTeacher)

            const useCase = new UpdateTeacherUseCase(mockTeacherService)
            const result = await useCase.execute(updateData)

            expect(result.success).to.be.true
            expect(result.data).to.have.property('name', 'Updated Teacher')
            expect(mockTeacherService.updateTeacher.calledOnceWith(teacherId, updateData.data)).to.be.true
        })
    })

    describe('DeleteTeacherUseCase', () => {
        it('should delete a teacher successfully', async () => {
            mockTeacherService.deleteTeacher.resolves()

            const useCase = new DeleteTeacherUseCase(mockTeacherService)
            const result = await useCase.execute({ id: teacherId })

            expect(result.success).to.be.true
            expect(result.data).to.have.property('message', 'Teacher deleted successfully')
            expect(mockTeacherService.deleteTeacher.calledOnceWith(teacherId)).to.be.true
        })
    })
})
