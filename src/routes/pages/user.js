const express = require('express')
const router = express.Router()
const utils = require('@utils/index')
const User = require('@controllers/users')
const checkAuth = require('@middleware/dto/is-valid-user')
const isValidDto = require('@middleware/dto/is-valid-dto')
const userSchema = require('@models/validations/user.schema')
const { handleRenderer, handleDatabase } = require('@utils/handlers/response')

router
    .get('/get_user', checkAuth, (req, res) => {
        res.header('Access-Control-Allow-Origin', '*')
        res.header(
            'Access-Control-Allow-Headers',
            'Origin, X-Requested-With, Content-Type, Accept'
        )
        res.send({ user: req.user })
    })
    .get('/users', checkAuth, (req, res) => {
        const pages = {
            runPage: 'pages/user-list',
            runProgram: 'administrative.user.list',
            runContent: 'system-user.list',
        }
        handleRenderer(req.user, pages, res)
    })
    .get('/user/:id?', checkAuth, async (req, res) => {
        const id = req.params.id
        const data = id ? await User.findUserById(id) : {}
        const pages = {
            data: data.data || {},
            runPage: 'pages/user-entry',
            runProgram: 'administrative.user.entry',
            runContent: 'system-user.entry',
        }
        handleRenderer(req.user, pages, res)
    })
    .post('/user', isValidDto(userSchema), (req, res) => {
        const getService = User.addUser(req.body)
        handleDatabase(getService, utils.isEmptyObject, res)
    })
    .put('/user/:id?', isValidDto(userSchema), (req, res) => {
        const { ['id']: rmId, ...data } = req.body
        const getService = User.updateWithPass(rmId, data)
        handleDatabase(getService, utils.isEmptyObject, res)
    })

module.exports = router
