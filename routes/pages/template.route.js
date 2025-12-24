class TemplatePageHandler {
    static privacyPolicy(req, res) {
        const theme = req.query.theme === 'dark' ? 'dark' : 'light'

        return res.render('pages/templates/privacy-policy', {
            layout: false,
            theme,
        })
    }

    static termsCondition(req, res) {
        const theme = req.query.theme === 'dark' ? 'dark' : 'light'

        return res.render('pages/templates/terms-condition', {
            layout: false,
            theme,
        })
    }
}

module.exports = TemplatePageHandler
