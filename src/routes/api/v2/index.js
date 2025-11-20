const express = require('express')
const router = express.Router()

// api routing
const teachers = require('./[teacher]')

// middlewares
const isValidDto = require('@middleware/dto/is-valid-dto')

// schema validations
const teacherSchema = require('@models/validations/teacher.schema')

module.exports = router

router
    .get('/teachers', teachers.index)
    .get('/teacher/:id', teachers.show)
    .get('/teacher', teachers.showBy)
    .post('/teacher', isValidDto(teacherSchema), teachers.create)
    .put('/teacher/:id', isValidDto(teacherSchema), teachers.update)
    .delete('/teacher/:id', teachers.delete)
