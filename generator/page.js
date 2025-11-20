const express = require('express')
const router = express.Router()
const utils = require('@utils/index')
const Services = require('@controllers/generators')
const checkAuth = require('@middleware/dto/is-valid-user')
const { handleRenderer, handleDatabase } = require('@utils/handlers/response')

router
    .get('/routings', checkAuth, (req, res, next) => {
        const pages = {
            runPage: 'pages/runnerPage-list',
            runProgram: 'menuList',
            runContent: 'menuList',
        }
        handleRenderer(req.user, pages, res)
    })
    .get('/routing/:id?', checkAuth, async (req, res, next) => {
        const id = req.params.id
        const data = id ? await Services.findDataById(id) : {}
        const pages = {
            data: data.data || {},
            runPage: 'pages/runnerPage-entry',
            runProgram: 'menuEntry',
            runContent: 'menuEntry',
        }
        handleRenderer(req.user, pages, res)
    })
    .post('/routing', (req, res, next) => {
        const getService = Services.addData(req.body)
        handleDatabase(getService, utils.isEmptyObject, res)
    })
    .put('/routing/:id?', (req, res, next) => {
        const { ['id']: rmId, ...data } = req.body
        const getService = Services.updateData(rmId, data)
        handleDatabase(getService, utils.isEmptyObject, res)
    })

module.exports = router
