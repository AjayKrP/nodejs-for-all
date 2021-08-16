const fs = require('fs');
const helper = require('../utils');

class MainController {
    constructor() {
        this.__data_source_path = './source/data.json';
    }
    get(req, res) {
        const jsonData = fs.readFileSync(this.__data_source_path);
        res.json({status: JSON.parse(jsonData)});
    }

    set(req, res) {
        let self = this;
        try {
            let payload = req.body;
            console.log(helper.validatePayload(payload));
            if (!helper.validatePayload(payload)) {
                res.status(502).json({error: 'JSON Validation Failed! Please check your JSON.'});
            } else {
                fs.appendFileSync(self.__data_source_path, JSON.stringify(payload));
                res.status(200).json({success: true});
            }
        } catch (e) {
            res.status(500).json({error: e.toString()});
        }
    }

    delete(req, res) {
        res.status(500).json({success: 'true'});
    }

    update(req, res) {
        res.status(200).json({success: 'true'});
    }
}

module.exports = new MainController();
