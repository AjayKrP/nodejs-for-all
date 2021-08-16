const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

class Server {
    constructor() {
        this.PORT = 3000;
        this.app = express();
        this.config();
        this.setupRoute();
        this.runApp();
    }

    config() {
        // parse application/x-www-form-urlencoded
        this.app.use(bodyParser.urlencoded({ extended: false }))
        // parse application/json
        this.app.use(bodyParser.json());

        /**
         * Middleware to remove some headers
         */
        this.app.use((req, res, next)=> {
            res.removeHeader('X-Powered-By');
            next();
        })
    }

    setupRoute() {
        this.app.use('/', routes);
    }

    runApp() {
        let self = this;
        this.app.listen(self.PORT, function () {
            console.log(`server listening to port: ${self.PORT}`)
        })
    }
}

module.exports = new Server();
