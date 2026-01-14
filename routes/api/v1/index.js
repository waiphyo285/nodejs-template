const express = require('express')
const router = express.Router()

const { isDA } = require('@utils/handlers/access-url.handler')
const isValidDto = require('@middleware/dto/is-valid-dto.middleware')

const users = require('./user.route')
const userRoles = require('./user-role.route')
const teachers = require('./teacher.route')
const students = require('./student.route')

const userDto = require('@models/validations/user.validation')
const userRoleDto = require('@models/validations/user-role.validation')
const teacherDto = require('@models/validations/teacher.validation')
const studentDto = require('@models/validations/student.validation')

module.exports = router

// basic user APIs
router
    .get('/users', users.find)
    .get('/user/:id', users.findById)
    .post('/user', isValidDto(userDto.create), users.create)
    .put('/user/:id', isValidDto(userDto.update), users.updateWithPass)
    .put('/edit-user/:id', users.updateWithoutPass)
    .put('/account', isValidDto(userDto.update), users.updateAccount)
    .delete('/user/:id', users.drop)


// basic role APIs
router
    .get('/config-roles', isDA, userRoles.config)
    .get('/user-roles', isDA, userRoles.find)
    .get('/user-role/:id', userRoles.findById)
    .get('/user-role', userRoles.findBy)
    .post('/user-role', isValidDto(userRoleDto.create), userRoles.create)
    .put('/user-role/:id', isValidDto(userRoleDto.update), userRoles.update)
    .delete('/user-role/:id', userRoles.drop)


// teacher APIs
router
    .get('/teachers', teachers.find)
    .get('/teacher/:id', teachers.findById)
    .get('/teacher', teachers.findBy)
    .post('/teacher', isValidDto(teacherDto.create), teachers.create)
    .put('/teacher/:id', isValidDto(teacherDto.update), teachers.update)
    .delete('/teacher/:id', teachers.drop)



// student APIs
router
    .get('/students', students.find)
    .get('/student/:id', students.findById)
    .get('/student', students.findBy)
    .post('/student', isValidDto(studentDto.create), students.create)
    .put('/student/:id', isValidDto(studentDto.update), students.update)
    .delete('/student/:id', students.drop)

