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
    .post('/user', users.create)
    .put('/user/:id', isValidDto(userDto), users.updateWithPass)
    .put('/edit-user/:id', users.updateWithoutPass)
    .delete('/user/:id', users.drop)

// basic role APIs
router
    .get('/config-roles', isDA, userRoles.config)
    .get('/user-roles', isDA, userRoles.find)
    .get('/user-role/:id', userRoles.findById)
    .get('/user-role', userRoles.findBy)
    .post('/user-role', isValidDto(userRoleDto), userRoles.create)
    .put('/user-role/:id', isValidDto(userRoleDto), userRoles.update)
    .delete('/user-role/:id', userRoles.drop)

// teacher APIs
router
    .get('/teachers', teachers.find)
    .get('/teacher/:id', teachers.findById)
    .get('/teacher', teachers.findBy)
    .post('/teacher', isValidDto(teacherDto), teachers.create)
    .put('/teacher/:id', isValidDto(teacherDto), teachers.update)
    .delete('/teacher/:id', teachers.drop)

// student APIs
router
    .get('/students', students.find)
    .get('/student/:id', students.findById)
    .get('/student', students.findBy)
    .post('/student', isValidDto(studentDto), students.create)
    .put('/student/:id', isValidDto(studentDto), students.update)
    .delete('/student/:id', students.drop)
