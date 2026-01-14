module.exports = function (schema) {
    const createState = function (next) {
        const self = this
        const date = new Date()
        self.created_at = date
        self.updated_at = date
        next()
    }

    const updateState = function (next) {
        const self = this
        const date = new Date()
        // work only as update state
        self._update.updated_at = date
        next()
    }

    // update date for bellow 5 methods
    schema
        .pre('save', createState)
        .pre('create', createState)
        .pre('update', updateState)
        .pre('findOneAndUpdate', updateState)
        .pre('findByIdAndUpdate', updateState)
}
