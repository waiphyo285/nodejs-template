const utils = require('@utils/index')

const addParams = (req, res, next) => {
    delete req.query._

    if (req.query.filter) {
        Object.keys(req.query.filter).forEach((key) => {
            req.query.filter[key] =
                req.query.filter[key] === 'null' ? null : req.query.filter[key]
        })
    }

    if (req.user && req.user.account_id) {
        const reqMethod = req.method

        switch (reqMethod) {
            case 'GET':
            case 'POST':
                req.query['n_filter'] = req.user.account_id
                break

            default:
                break
        }
    }

    let gmtOffset = req.headers['x-gmt-offset']

    if (!gmtOffset && req.user && req.user.tz_offset) {
        gmtOffset = req.user.tz_offset
    }

    let diffHours = 0

    if (gmtOffset && (diffHours = utils.gmtToNumeric(gmtOffset))) {
        req.query['tz_filter'] = {
            gmt_offset: gmtOffset,
            diff_hours: diffHours,
        }
    } else {
        req.query['tz_filter'] = {
            gmt_offset: 'GMT+0630',
            diff_hours: -6.5,
        }
    }

    !utils.isEmpty(req.body) &&
        iamlog.info('Pageware body', JSON.stringify(req.body))
    !utils.isEmpty(req.query) &&
        iamlog.info('Pageware query', JSON.stringify(req.query))
    !utils.isEmpty(req.params) &&
        iamlog.info('Pageware params', JSON.stringify(req.params))
    !utils.isEmpty(req.headers) &&
        iamlog.info('Pageware headers', JSON.stringify(req.headers))
    !utils.isEmpty(req.user) &&
        iamlog.info('Pageware currentuser', JSON.stringify(req.user))

    return next()
}

module.exports = { addParams }
