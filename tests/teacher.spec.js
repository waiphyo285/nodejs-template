const chai = require('chai')
const chaiHttp = require('chai-http')
const app = require('../app')

chai.use(chaiHttp)
const { expect } = chai

describe('Teacher API Tests', () => {
    let teacherId

    describe('POST /api/v1/teacher', () => {
        it('should create a new teacher', (done) => {
            const teacher = {
                name: 'Test Teacher',
                age: 35,
                degree: 'Masters in Education',
                status: true,
            }

            chai.request(app)
                .post('/api/v1/teacher')
                .send(teacher)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('data')
                    expect(res.body.data).to.have.property('id')
                    teacherId = res.body.data.id
                    done()
                })
        })
    })

    describe('GET /api/v1/teachers', () => {
        it('should get all teachers', (done) => {
            chai.request(app)
                .get('/api/v1/teachers')
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('data')
                    done()
                })
        })
    })

    describe('GET /api/v1/teacher/:id', () => {
        it('should get a teacher by id', (done) => {
            chai.request(app)
                .get(`/api/v1/teacher/${teacherId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('data')
                    expect(res.body.data).to.have.property(
                        'name',
                        'Test Teacher'
                    )
                    done()
                })
        })
    })

    describe('PUT /api/v1/teacher/:id', () => {
        it('should update a teacher', (done) => {
            const updatedTeacher = {
                name: 'Updated Test Teacher',
                age: 36,
                degree: 'PhD in Education',
            }

            chai.request(app)
                .put(`/api/v1/teacher/${teacherId}`)
                .send(updatedTeacher)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    expect(res.body).to.have.property('data')
                    done()
                })
        })
    })

    describe('DELETE /api/v1/teacher/:id', () => {
        it('should delete a teacher', (done) => {
            chai.request(app)
                .delete(`/api/v1/teacher/${teacherId}`)
                .end((err, res) => {
                    expect(res).to.have.status(200)
                    done()
                })
        })
    })
})
