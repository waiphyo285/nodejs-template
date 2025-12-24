const express = require('express')
const router = express.Router()

const upload = require('./upload')
const deleteFile = require('./delete')

router
    .post('/upload/:folderName', upload.create)
    .post('/upload/many/:folderName', upload.createMany)
    .delete('/delete/:filePath', deleteFile.drop)

module.exports = router
