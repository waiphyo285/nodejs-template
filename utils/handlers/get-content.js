const path = require('path')
const config = require('@config/index')

const DEF_LANG = config.APP.LOCALES
const DEF_PAGE = ['common', 'navbar', 'modal', 'modal-lbl', 'user-msg']

const getContentPath = (pageName) => {
    return `../../config/locales/${pageName}.json`
}

const extractData = (content, keys) => {
    let modKeys = keys
    let modContent = content[modKeys[0]]

    if (modKeys.length > 1) {
        modKeys.shift()
        return extractData(modContent, modKeys)
    } else {
        return modContent
    }
}

const getJsonData = (pageName) => {
    const contentPath = path.resolve(__dirname, getContentPath(pageName))
    return JSON.parse(JSON.stringify(require(contentPath)))
}

const getContent = (locale = DEF_LANG, pageName, keys) => {
    let defaultContentJson = {}

    DEF_PAGE.forEach((pageName) => {
        defaultContentJson = {
            ...defaultContentJson,
            [pageName]: extractData(getJsonData(pageName), [locale]),
        }
    })

    return {
        ...defaultContentJson,
        ...extractData(getJsonData(pageName), [locale, ...keys]),
    }
}

module.exports = { getContent }
