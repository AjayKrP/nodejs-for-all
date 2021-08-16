class Helper {
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
}

module.exports = new Helper();
