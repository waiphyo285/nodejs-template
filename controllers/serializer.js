const { isArray } = require('@utils/index')

const serializer = (data, change = false) => {
    switch (true) {
        case !data:
            return null

        case isArray(data.data):
            return { ...data, data: data.data }

        default:
            return { data: data }
    }
}

module.exports = serializer
