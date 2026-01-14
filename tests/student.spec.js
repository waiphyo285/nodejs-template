const sinon = require('sinon')
const { expect } = require('chai')

const CreateStudentUseCase = require('../app/application/usecases/student/create-student.usecase')
const FindStudentsUseCase = require('../app/application/usecases/student/find-students.usecase')
const GetStudentByIdUseCase = require('../app/application/usecases/student/get-student-by-id.usecase')
const UpdateStudentUseCase = require('../app/application/usecases/student/update-student.usecase')
const DeleteStudentUseCase = require('../app/application/usecases/student/delete-student.usecase')

describe('Student Use Cases', () => {
    let mockStudentService
    let studentId = 'test-student-id'

    beforeEach(() => {
        mockStudentService = {
            createStudent: sinon.stub(),
            findStudents: sinon.stub(),
            getStudentById: sinon.stub(),
            updateStudent: sinon.stub(),
            deleteStudent: sinon.stub()
        }
    })

    afterEach(() => {
        sinon.restore()
    })

    describe('CreateStudentUseCase', () => {
        it('should create a new student successfully', async () => {
            const studentData = { name: 'Test Student', age: 20, grade: 88, status: true }
            const createdStudent = { id: studentId, ...studentData }
            mockStudentService.createStudent.resolves(createdStudent)

            const useCase = new CreateStudentUseCase(mockStudentService)
            const result = await useCase.execute(studentData)

            expect(result.success).to.be.true
            expect(result.data).to.have.property('id', studentId)
            expect(result.data).to.have.property('name', 'Test Student')
            expect(mockStudentService.createStudent.calledOnceWith(studentData)).to.be.true
        })

        it('should fail when name is missing', async () => {
            const useCase = new CreateStudentUseCase(mockStudentService)
            const result = await useCase.execute({ age: 20, grade: 88 })

            expect(result.success).to.be.false
            expect(result.isValidationError).to.be.true
        })
    })

    describe('FindStudentsUseCase', () => {
        it('should return all students', async () => {
            const students = [
                { id: '1', name: 'Student 1', age: 20 },
                { id: '2', name: 'Student 2', age: 21 }
            ]
            mockStudentService.findStudents.resolves(students)

            const useCase = new FindStudentsUseCase(mockStudentService)
            const result = await useCase.execute({})

            expect(result.success).to.be.true
            expect(result.data).to.be.an('array').with.lengthOf(2)
        })
    })

    describe('GetStudentByIdUseCase', () => {
        it('should get a student by id', async () => {
            const student = { id: studentId, name: 'Test Student', age: 20 }
            mockStudentService.getStudentById.resolves(student)

            const useCase = new GetStudentByIdUseCase(mockStudentService)
            const result = await useCase.execute({ id: studentId })

            expect(result.success).to.be.true
            expect(result.data).to.have.property('name', 'Test Student')
            expect(mockStudentService.getStudentById.calledOnceWith(studentId)).to.be.true
        })

        it('should fail when id is missing', async () => {
            const useCase = new GetStudentByIdUseCase(mockStudentService)
            const result = await useCase.execute({})

            expect(result.success).to.be.false
            expect(result.isValidationError).to.be.true
        })
    })

    describe('UpdateStudentUseCase', () => {
        it('should update a student successfully', async () => {
            const updateData = { id: studentId, data: { name: 'Updated Student', age: 21 } }
            const updatedStudent = { id: studentId, name: 'Updated Student', age: 21 }
            mockStudentService.updateStudent.resolves(updatedStudent)

            const useCase = new UpdateStudentUseCase(mockStudentService)
            const result = await useCase.execute(updateData)

            expect(result.success).to.be.true
            expect(result.data).to.have.property('name', 'Updated Student')
            expect(mockStudentService.updateStudent.calledOnceWith(studentId, updateData.data)).to.be.true
        })
    })

    describe('DeleteStudentUseCase', () => {
        it('should delete a student successfully', async () => {
            mockStudentService.deleteStudent.resolves()

            const useCase = new DeleteStudentUseCase(mockStudentService)
            const result = await useCase.execute({ id: studentId })

            expect(result.success).to.be.true
            expect(result.data).to.have.property('message', 'Student deleted successfully')
            expect(mockStudentService.deleteStudent.calledOnceWith(studentId)).to.be.true
        })
    })
})
