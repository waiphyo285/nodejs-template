const fs = require('fs');
const path = require('path');

/**
 * Container Scanner
 * Automatically scans directories and registers classes into the container.
 */
class ContainerScanner {
    constructor(container) {
        this.container = container;
    }

    /**
     * Scan and register all files in a directory
     * 
     * @param {String} dir - Absolute path to directory
     * @param {String} suffix - Suffix to look for (e.g. '.repository.js')
     * @param {Function} factory - Callback to define how to register the item
     */
    scan(dir, suffix, factory) {
        if (!fs.existsSync(dir)) return;

        const files = fs.readdirSync(dir);
        files.forEach(file => {
            const fullPath = path.join(dir, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory()) {
                this.scan(fullPath, suffix, factory);
            } else if (file.endsWith(suffix)) {
                const name = this.toCamelCase(file.replace(suffix, ''));
                const key = name + this.toPascalCase(suffix.replace('.js', '').replace('.', ''));
                const module = require(fullPath);
                factory(key, module);
            }
        });
    }

    toCamelCase(str) {
        return str.replace(/[-_]([a-z])/g, (g) => g[1].toUpperCase());
    }

    toPascalCase(str) {
        const camel = this.toCamelCase(str);
        return camel.charAt(0).toUpperCase() + camel.slice(1);
    }
}

module.exports = ContainerScanner;
