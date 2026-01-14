const express = require('express')
const router = express.Router()

const checkAuth = require('@middleware/dto/is-valid-user.middleware')
const isValidDto = require('@middleware/dto/is-valid-dto.middleware')

const userDto = require('@models/validations/user.validation')
const userRoleDto = require('@models/validations/user-role.validation')
const teacherDto = require('@models/validations/teacher.validation')
const studentDto = require('@models/validations/student.validation')

const DashboardHandler = require('./dashboard.route')
const TemplatePageHandler = require('./template.route')
const UserRolePageHandler = require('./user-role.route')
const UserPageHandler = require('./user.route')
const TeacherPageHandler = require('./teacher.route')
const StudentPageHandler = require('./student.route')

// Dashboard
router.get('/', checkAuth, DashboardHandler.index)

// Account (Current User)
router.get('/account', checkAuth, UserPageHandler.account)
router.put('/account', isValidDto(userDto.update), UserPageHandler.updateAccount)

// User Role
router
    .get('/user-roles', checkAuth, UserRolePageHandler.list)
    .get('/user-role/:id?', checkAuth, UserRolePageHandler.entry)
    .post('/user-role', isValidDto(userRoleDto.create), UserRolePageHandler.create)
    .put('/user-role/:id?', isValidDto(userRoleDto.update), UserRolePageHandler.update)

// User
router
    .get('/get_user', checkAuth, UserPageHandler.get_user)
    .get('/users', checkAuth, UserPageHandler.list)
    .get('/user/:id?', checkAuth, UserPageHandler.entry)
    .post('/user', isValidDto(userDto.create), UserPageHandler.create)
    .put('/user/:id?', isValidDto(userDto.update), UserPageHandler.update)

// Teacher
router
    .get('/teachers', checkAuth, TeacherPageHandler.list)
    .get('/teacher/:id?', checkAuth, TeacherPageHandler.entry)
    .post('/teacher', isValidDto(teacherDto.create), TeacherPageHandler.create)
    .put('/teacher/:id?', isValidDto(teacherDto.update), TeacherPageHandler.update)

// Student
router
    .get('/students', checkAuth, StudentPageHandler.list)
    .get('/student/:id?', checkAuth, StudentPageHandler.entry)
    .post('/student', isValidDto(studentDto.create), StudentPageHandler.create)
    .put('/student/:id?', isValidDto(studentDto.update), StudentPageHandler.update)

// Templates
router.get('/privacy-policy', TemplatePageHandler.privacyPolicy)
router.get('/terms-condition', TemplatePageHandler.termsCondition)

module.exports = router
