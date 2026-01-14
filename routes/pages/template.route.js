class TemplatePageHandler {
    static async privacyPolicy(req, res) {
        const theme = req.query.theme === 'dark' ? 'dark' : 'light'
        await res.renderPage('pages/templates/privacy-policy', {
            options: { layout: false, theme },
        })
    }

    static async termsCondition(req, res) {
        const theme = req.query.theme === 'dark' ? 'dark' : 'light'
        await res.renderPage('pages/templates/terms-condition', {
            options: { layout: false, theme },
        })
    }
}

module.exports = TemplatePageHandler
