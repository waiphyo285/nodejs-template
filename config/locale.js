const path = require('path')
const I18n = require('i18n-node')

const langI18n = new I18n({
    directory: path.join(__dirname, '../resources/lang/http'),
})

module.exports = { langI18n }
