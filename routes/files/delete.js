const multer = require('multer')
const fs = require('fs')
const path = require('path')
const helpers = require('./helpers')
const config = require('@config/index')

class DeleteHandler {
    static drop(req, res, next) {
        // write here you want to delete the medias
    }
}

module.exports = DeleteHandler
