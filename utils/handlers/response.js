const config = require('@config/index')
const { getProgram } = require('./access-user')
const { getContent } = require('./get-content')

const handleDuplicate = (err) => {
    let message = `Some keys are already existed.`
    const keys = Object.keys(err.keyValue)
    if (keys) message = `${keys} is already existed.`
    return message
}

const handleCastError = (err) => {
    const message = `Invalid ${err.path}: ${err.value}.`
    return message
}

const handleValidateError = (err) => {
    let message = 'Invalid property or value.'
    const key = Object.keys(err.errors)
    message = `Invalid ${err.errors[key[0]].path}: ${err.errors[key[0]].value}.`
    if (err.errors[key[0]] && err.errors[key[0]].properties) {
        message = err.errors[key[0]].properties.message
    }
    return message
}

const handleError = (err, locales) => {
    let message = 'Something went wrong.'
    const { code, description } = locales[500]

    if (err.code && err.code === 11000) {
        message = handleDuplicate(err)
    }
    if (err.name && err.name === 'CastError') {
        message = handleCastError(err)
    }
    if (err.name && err.name === 'ValidationError') {
        message = handleValidateError(err)
    }
    return { code, message, description }
}

const handleRenderer = async (user, pages, res) => {
    const { runPage, runProgram, runContent, data, options } = pages
    const contentKeys = runContent.split('.')
    const contentPage = contentKeys.shift()

    const getPageMenu = await getProgram(user, runProgram)
    const contentData = await getContent(user.locale, contentPage, contentKeys)
    const getPageData = { app: config.APP, data, content: contentData, options }

    res.render(runPage, {
        ...getPageData,
        ...getPageMenu,
    })
}

const handleDatabase = (getService, utils, res) => {
    const locales = res.locals.i18n.translations
    getService
        .then((data) => {
            return handleResponse(data, utils, locales)
        })
        .then((response) => {
            iamlog.info('Handle response ', response)
            res.status(+response.code).json(response)
        })
        .catch((err) => {
            const responseError = handleError(err, locales)
            console.error('Catch Error ', err, responseError)
            res.status(+responseError.code).json(responseError)
        })
}

const handleResponse = (data, utils, locales) => {
    const create_response = !utils(data)
        ? createResponse(data.http_code || 200, { data }, locales)
        : createResponse(data.http_code || 400, {}, locales)
    return create_response
}

const createResponse = (number, rest, locales) => {
    const { code, message, description } = locales[number]
    return { code, message, description, ...rest.data }
}

module.exports = {
    handleError,
    handleResponse,
    handleRenderer,
    handleDatabase,
    createResponse,
}
