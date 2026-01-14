class DashboardHandler {
    static async index(req, res, next) {
        res.locals.scripts.push(
            'https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js',
            '../javascript/lib/chart-js/chart.bundle.min.js',
            '../javascript/dashboard.js'
        )

        await res.renderPage('pages/dashboard', {
            program: 'dashboard.null.null',
            content: 'common',
            data: {
                card: {
                    total_1: 100,
                    total_2: 50,
                    total_3: 25,
                    total_4: 75,
                },
                barchart: [],
            },
        })
    }
}

module.exports = DashboardHandler
