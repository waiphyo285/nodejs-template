const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')

chai.use(chaiHttp)
const { expect } = chai

describe('Student API Tests', () => {
    let studentId

    describe('POST /api/v1/student', () => {
        it('should create a new student', (done) => {
            const student = {
                name: 'Test Student',
                age: 20,
                grade: 88,
                status: true
            }

            chai.request(app)
                .post('/api/v1/student')
                .send(student)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('data')
                    expect(res.body.data).to.have.property('id')
                    studentId = res.body.data.id
                    done()
                })
        })
    })

    describe('GET /api/v1/students', () => {
        it('should get all students', (done) => {
            chai.request(app)
                .get('/api/v1/students')
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('data')
                    done()
                })
        })
    })

    describe('GET /api/v1/student/:id', () => {
        it('should get a student by id', (done) => {
            chai.request(app)
                .get(`/api/v1/student/${studentId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('data')
                    expect(res.body.data).to.have.property('name', 'Test Student')
                    done()
                })
        })
    })

    describe('PUT /api/v1/student/:id', () => {
        it('should update a student', (done) => {
            const updatedStudent = {
                name: 'Updated Test Student',
                age: 21,
                grade: 90
            }

            chai.request(app)
                .put(`/api/v1/student/${studentId}`)
                .send(updatedStudent)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('data')
                    done()
                })
        })
    })

    describe('DELETE /api/v1/student/:id', () => {
        it('should delete a student', (done) => {
            chai.request(app)
                .delete(`/api/v1/student/${studentId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    done()
                })
        })
    })
})