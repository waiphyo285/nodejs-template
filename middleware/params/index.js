const utils = require('@utils/index')

const addParams = (req, res, next) => {
    delete req.query._

    // null can not pass in query, transform from 'null' to null
    if (req.query.filter) {
        Object.keys(req.query.filter).forEach((key) => {
            req.query.filter[key] =
                req.query.filter[key] === 'null' ? null : req.query.filter[key]
        })
    }

    // being account_id, can assume user(logging) is not developer
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

    // add GMT offset to request query, which may be required for date filtering
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

    iamlog.info('Pageware body', req.body)
    iamlog.info('Pageware query', req.query)
    iamlog.info('Pageware params', req.params)
    iamlog.info('Pageware headers', req.headers)
    iamlog.info('Pageware currentuser', req.user)

    return next()
}

module.exports = { addParams }
