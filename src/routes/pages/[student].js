const express = require('express')
const router = express.Router()
const utils = require('@utils/index')
const Student = require('@controllers/[students]')
const checkAuth = require('@middleware/dto/is-valid-user')
const isValidDto = require('@middleware/dto/is-valid-dto')
const studentSchema = require('@models/validations/student.schema')
const { handleRenderer, handleDatabase } = require('@utils/handlers/response')

router
    .get('/students', checkAuth, (req, res) => {
        const pages = {
            runPage: 'pages/student-list',
            runProgram: 'course.student.list',
            runContent: 'student.list',
        }
        handleRenderer(req.user, pages, res)
    })
    .get('/student/:id?', checkAuth, async (req, res) => {
        const id = req.params.id
        const data = id ? await Student.findDataById(id) : {}
        const pages = {
            data: data.data || {},
            runPage: 'pages/student-entry',
            runProgram: 'course.student.entry',
            runContent: 'student.entry',
        }
        handleRenderer(req.user, pages, res)
    })
    .post('/student', isValidDto(studentSchema), (req, res) => {
        utils.removeImages(req.body.remove_images || []).then((_res) => {
            // eslint-disable-next-line no-self-assign
            req.body.images = req.body.images
            const getService = Student.addData(req.body)
            handleDatabase(getService, utils.isEmptyObject, res)
        })
    })
    .put('/student/:id?', isValidDto(studentSchema), (req, res) => {
        utils.removeImages(req.body.remove_images || []).then((_res) => {
            const { ['id']: rmId, ...data } = req.body
            // eslint-disable-next-line no-self-assign
            data.images = data.images
            const getService = Student.updateData(rmId, data)
            handleDatabase(getService, utils.isEmptyObject, res)
        })
    })

module.exports = router
