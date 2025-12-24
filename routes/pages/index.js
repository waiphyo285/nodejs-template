const express = require('express')
const router = express.Router()

const checkAuth = require('@middleware/dto/is-valid-user')
const isValidDto = require('@middleware/dto/is-valid-dto')

const userDto = require('@models/validations/user')
const userRoleDto = require('@models/validations/user-role')
const teacherDto = require('@models/validations/teacher')
const studentDto = require('@models/validations/student')

const DashboardHandler = require('./dashboard')
const TemplatePageHandler = require('./template')
const UserRolePageHandler = require('./user-role')
const UserPageHandler = require('./user')
const TeacherPageHandler = require('./teacher')
const StudentPageHandler = require('./student')

// Dashboard
router.get('/', checkAuth, DashboardHandler.index)

// User Role
router
    .get('/user-roles', checkAuth, UserRolePageHandler.list)
    .get('/user-role/:id?', checkAuth, UserRolePageHandler.entry)
    .post('/user-role', isValidDto(userRoleDto), UserRolePageHandler.create)
    .put('/user-role/:id?', isValidDto(userRoleDto), UserRolePageHandler.update)

// User
router
    .get('/get_user', checkAuth, UserPageHandler.get_user)
    .get('/users', checkAuth, UserPageHandler.list)
    .get('/user/:id?', checkAuth, UserPageHandler.entry)
    .post('/user', isValidDto(userDto), UserPageHandler.create)
    .put('/user/:id?', isValidDto(userDto), UserPageHandler.update)

// Teacher
router
    .get('/teachers', checkAuth, TeacherPageHandler.list)
    .get('/teacher/:id?', checkAuth, TeacherPageHandler.entry)
    .post('/teacher', isValidDto(teacherDto), TeacherPageHandler.create)
    .put('/teacher/:id?', isValidDto(teacherDto), TeacherPageHandler.update)

// Student
router
    .get('/students', checkAuth, StudentPageHandler.list)
    .get('/student/:id?', checkAuth, StudentPageHandler.entry)
    .post('/student', isValidDto(studentDto), StudentPageHandler.create)
    .put('/student/:id?', isValidDto(studentDto), StudentPageHandler.update)

// Templates
router.get('/privacy-policy', TemplatePageHandler.privacyPolicy)
router.get('/terms-condition', TemplatePageHandler.termsCondition)

module.exports = router
