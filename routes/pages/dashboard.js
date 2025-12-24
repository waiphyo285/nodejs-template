const config = require('@config/index')
const { getProgram } = require('@utils/handlers/access-user')
const { getContent } = require('@utils/handlers/get-content')

class DashboardHandler {
    static async index(req, res, next) {
        // const [total_song, total_artist, total_band, total_request] =
        //     await Promise.all([
        //         SongModel.countDocuments(),
        //         ArtistModel.countDocuments(),
        //         BandModel.countDocuments(),
        //         SongRequestModel.countDocuments(),
        //     ])

        const curUserProgram = await getProgram(req.user, 'dashboard.null.null')
        const getPageContent = await getContent(
            req.user.locale,
            'dashboard',
            []
        )

        res.render('pages/dashboard', {
            ...curUserProgram,
            app: config.APP,
            data: {
                card: {
                    total_song: 100,
                    total_artist: 50,
                    total_band: 25,
                    total_request: 75,
                },
                barchart: [],
            },
            content: getPageContent,
        })
    }
}

module.exports = DashboardHandler
