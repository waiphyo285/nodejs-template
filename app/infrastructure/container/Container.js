class Container {
    constructor() {
        this.services = {}
    }

    /**
     * Register a service in the container
     */
    register(name, definition) {
        this.services[name] = definition
    }

    /**
     * Get a service from the container
     */
    get(name) {
        const service = this.services[name]
        if (!service) {
            throw new Error(`Service ${name} not found in container`)
        }
        return typeof service === 'function' ? service() : service
    }

    /**
     * Check if service exists
     */
    has(name) {
        return name in this.services
    }
}

module.exports = Container
