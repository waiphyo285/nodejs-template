const fs = require('fs')
const moment = require('moment')
const pluralize = require('pluralize')
const timezone = require('./config/timezone.config')

/**
 * Utils Functions
 */

const utils = (module.exports = {})

utils.isEmpty = function (val) {
    return (
        val === null ||
        val === undefined ||
        (typeof val === 'object' && Object.keys(val).length === 0)
    )
}

utils.isEmptyString = function (str) {
    return str === '' || str === null || str === undefined
}

utils.isEmptyNumber = function (num) {
    return typeof num !== 'number' || Number.isNaN(num)
}

utils.isEmptyObject = function (obj) {
    return (
        obj === null ||
        obj === undefined ||
        (typeof obj === 'object' && Object.keys(obj).length === 0)
    )
}

utils.isEmptyArray = function (arr) {
    return !Array.isArray(arr) || arr.length === 0
}

utils.isArray = function (arr) {
    return Array.isArray(arr)
}

utils.isEmail = function (email) {
    // eslint-disable-next-line no-useless-escape
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    return !!email.match(regex)
}

utils.getTimeZone = function (utc = '+06:30') {
    return timezone.find((tz) => tz.utc === utc)
}

utils.toPluralize = function (str) {
    return pluralize(str)
}

utils.toCamelCase = function (str) {
    return str
        .replaceAll(/\s(.)/g, (_, group1) => group1.toUpperCase())
        .replaceAll(' ', '')
        .replace(/^(.)/, (_, group1) => group1.toLowerCase())
}

utils.toTitleCase = function (str, splitWith, joinWith) {
    return str
        .split(splitWith)
        .map((w) => w[0].toUpperCase() + w.substr(1).toLowerCase())
        .join(joinWith)
}

utils.getCouponCode = function (length = 8) {
    let couponCode = ''
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length)
        couponCode += characters.charAt(randomIndex)
    }

    return couponCode
}

utils.getDailyDate = function (args) {
    const { diff_hours } = args.tz_filter

    const startDate = moment().utc().startOf('day').add(diff_hours, 'hours') // Today at midnight
    const endDate = moment().utc().endOf('day').add(diff_hours, 'hours') // Today at 23:59:59

    return { startDate, endDate }
}

utils.getLast7Day = function (args) {
    const { diff_hours } = args.tz_filter

    const endDate = moment().utc().endOf('day').add(diff_hours, 'hours')
    const startDate = moment(endDate).subtract(6, 'days').startOf('day')

    return { startDate, endDate }
}

utils.getWeeklyDate = function (args) {
    const { diff_hours } = args.tz_filter

    const startDate = moment().utc().startOf('isoWeek').add(diff_hours, 'hours') // First day of the current ISO week at midnight
    const endDate = moment().utc().endOf('isoWeek').add(diff_hours, 'hours') // Last day of the current ISO week at 23:59:59

    return { startDate, endDate }
}

utils.getMonthlyDate = function (args) {
    const { diff_hours } = args.tz_filter

    const startDate = moment().utc().startOf('month').add(diff_hours, 'hours') // First day of the current month at midnight
    const endDate = moment().utc().endOf('month').add(diff_hours, 'hours') // Last day of the current month at 23:59:59

    return { startDate, endDate }
}

utils.getYearlyDate = function (args) {
    const { diff_hours } = args.tz_filter

    const startDate = moment().utc().startOf('year').add(diff_hours, 'hours') // First day of the current year at midnight
    const endDate = moment().utc().endOf('year').add(diff_hours, 'hours') // Last day of the current year at 23:59:59

    return { startDate, endDate }
}

utils.getDateRange = async function (args) {
    return {
        $gte: args.gte
            ? new Date(moment(args.gte, ['DD/MM/YYYY']).format('YYYY-MM-D'))
            : new Date('1900-01-01'),
        $lte: args.lt
            ? new Date(moment(args.lt, ['DD/MM/YYYY']).format('YYYY-MM-D'))
            : new Date(),
    }
}

utils.getDateRangeByDuration = function (duration = 1, type = 'months') {
    const startDate = moment()
    const endDate = startDate.clone().add(duration, type)

    return {
        startDate: startDate.format('YYYY-MM-DD HH:mm:ss'),
        endDate: endDate.format('YYYY-MM-DD HH:mm:ss'),
    }
}

utils.getWeekDateRange = function (
    year = 1970,
    week = 1,
    format = 'DD/MM/YYYY'
) {
    const startDate = moment().year(year).isoWeek(week).startOf('isoWeek')
    const endDate = moment().year(year).isoWeek(week).endOf('isoWeek')

    return `${startDate.format(format)} - ${endDate.format(format)}`
}

utils.getDateInfo = function (date = new Date()) {
    const mmDate = moment(date)
    return {
        day: mmDate.format('dddd'),
        week: mmDate.isoWeek(),
        month: mmDate.format('MMMM'),
        year: mmDate.year(),
        dayOfWeek: mmDate.format('d'),
        dayOfMonth: mmDate.date(),
        quarter: Math.ceil(mmDate.month() / 3),
        isWeekend: mmDate.isoWeekday() > 5,
        isLeapYear: mmDate.isLeapYear(),
        isSameDay: (compDate) => mmDate.isSame(compDate, 'day'),
        isSameMonth: (compDate) => mmDate.isSame(compDate, 'month'),
        isSameYear: (compDate) => mmDate.isSame(compDate, 'year'),
    }
}

utils.convertDate = function (
    date = new Date(),
    from = 'YYYY-MM-DD HH:mm:ss',
    to = 'DD/MM/YYYY hh:mm A'
) {
    const parsedDate = moment(date, from)

    if (!parsedDate.isValid()) {
        throw new Error(`Invalid date or format: ${date} ${to}`)
    }

    return parsedDate.format(to)
}

utils.removeImages = async function (images) {
    if (!images || images.length === 0) return Promise.resolve()

    const fs = require('fs').promises
    const results = []

    for (const file of images) {
        try {
            const filePath = './public' + file.replace(/\\/g, '/')
            await fs.unlink(filePath)
            console.info(`File ${file} is removed`)
            results.push({ file, success: true })
        } catch (err) {
            if (err.code === 'ENOENT') {
                console.info(`File ${file} was already removed or doesn't exist`)
                results.push({ file, success: true, reason: 'already_removed' })
            } else {
                console.error(`File deletion error for ${file}:`, err.message)
                results.push({ file, success: false, error: err.message })
            }
        }
    }

    // Always resolve - we don't want to break the flow for file deletion issues
    return Promise.resolve(results)
}

utils.nFormatter = function (num, digits) {
    const lookup = [
        { value: 1, symbol: '' },
        { value: 1e3, symbol: 'k' },
        { value: 1e6, symbol: 'M' },
        { value: 1e9, symbol: 'G' },
        { value: 1e12, symbol: 'T' },
        { value: 1e15, symbol: 'P' },
        { value: 1e18, symbol: 'E' },
    ]
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/

    const sign = num < 0 ? '-' : ''
    const absoluteNum = Math.abs(num)

    const item = lookup
        .slice()
        .reverse()
        .find((item) => absoluteNum >= item.value)

    return item
        ? sign +
        (absoluteNum / item.value).toFixed(digits).replace(rx, '$1') +
        item.symbol
        : '0'
}

utils.merge2Array = function (arr1, arr2, key1, key2) {
    if (arr1.length !== arr2.length) return []

    const map = new Map(arr1.map((item) => [String(item[key1]), item]))

    return arr2.map((item) => {
        const relatedItem = map.get(String(item[key2]))
        return relatedItem ? { ...relatedItem, ...item } : item
    })
}

utils.convertGMTOffset = function (offsetMin) {
    const sign = offsetMin < 0 ? '+' : '-'
    let hours = Math.floor(Math.abs(offsetMin) / 60)
    let minutes = Math.abs(offsetMin) % 60

    hours = hours.toString().padStart(2, '0')
    minutes = minutes.toString().padStart(2, '0')

    return `GMT${sign}${hours}:${minutes}`
}

utils.gmtToNumeric = function (gmtFormat) {
    const regex = /^GMT([+-])(\d{2}):?(\d{2})$/ // Updated regex to allow an optional colon
    const match = gmtFormat.match(regex)

    if (match) {
        const sign = match[1] === '+' ? -1 : 1
        const hours = Number.parseInt(match[2], 10)
        const minutes = match[3] ? Number.parseInt(match[3], 10) : 0
        const totalOffset = sign * (hours + minutes / 60)

        return totalOffset
    }

    return null
}

utils.validateSubscription = function (subscription) {
    const currentDate = new Date()
    const startDate = new Date(subscription.started_at)
    const endDate = new Date(subscription.expired_at)
    const isValid =
        currentDate >= startDate &&
        currentDate <= endDate &&
        subscription.status
    return isValid
}
