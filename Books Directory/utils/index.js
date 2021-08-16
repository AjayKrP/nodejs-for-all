const fs = require('fs');

class Helper {
    constructor() {
        this.DATA_SOURCE_PATH = './source/data.json';
    }
    /**
     * This function is used to validate JSON payload coming from POST request
     * @param payload
     * @returns {boolean}
     */
    validatePayload(payload) {
        return !(!payload.hasOwnProperty('author') &&
            !payload.hasOwnProperty('country') &&
            !payload.hasOwnProperty('imageLink') &&
            !payload.hasOwnProperty('language') &&
            !payload.hasOwnProperty('link') &&
            !payload.hasOwnProperty('pages') &&
            !payload.hasOwnProperty('title') &&
            !payload.hasOwnProperty('year')
        );
    }

    getDataSourceContent() {
        const jsonData = fs.readFileSync(this.DATA_SOURCE_PATH);
        return JSON.parse(jsonData);
    }
}

module.exports = new Helper();
