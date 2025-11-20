const express = require('express')
const router = express.Router()

// user routing
const users = require('./user')
const userRoles = require('./user-role')
const students = require('./[student]')

// helpers
const { isDA } = require('@utils/handlers/access-url')

// middleware
const isValidDto = require('@middleware/dto/is-valid-dto')

// schema validations
const userSchema = require('@models/validations/user.schema')
const userRoleSchema = require('@models/validations/user-role.schema')
const studentSchema = require('@models/validations/student.schema')

module.exports = router

// basic user APIs
router
    .get('/users', users.index)
    .get('/user/:id', users.show)
    .post('/user', users.create)
    .put('/user/:id', isValidDto(userSchema), users.updateWithPass)
    .put('/edit-user/:id', users.updateWithoutPass)
    .delete('/user/:id', users.delete)

// basic role APIs
router
    .get('/config-roles', isDA, userRoles.config)
    .get('/user-roles', isDA, userRoles.index)
    .get('/user-role/:id', userRoles.show)
    .get('/user-role', userRoles.showBy)
    .post('/user-role', isValidDto(userRoleSchema), userRoles.create)
    .put('/user-role/:id', isValidDto(userRoleSchema), userRoles.update)
    .delete('/user-role/:id', userRoles.delete)


router
    .get('/students', students.index)
    .get('/student/:id', students.show)
    .get('/student', students.showBy)
    .post('/student', isValidDto(studentSchema), students.create)
    .put('/student/:id', isValidDto(studentSchema), students.update)
    .delete('/student/:id', students.delete)