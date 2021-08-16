const fs = require('fs');
const helper = require('../utils');

class MainController {

    get(req, res) {
        res.json({status: helper.getDataSourceContent()});
    }

    set(req, res) {
        try {
            let payload = req.body;
            console.log(helper.validatePayload(payload));
            if (!helper.validatePayload(payload)) {
                res.status(502).json({error: 'JSON Validation Failed! Please check your JSON.'});
            } else {
                let content = helper.getDataSourceContent();
                let documentId = 0;
                let documentLength = content.length;
                if (documentLength > 0) {
                    documentId = content[documentLength-1].id + 1;
                }
                payload.id = documentId;
                content.push(payload);
                fs.writeFileSync(helper.DATA_SOURCE_PATH, JSON.stringify(content));
                res.status(200).json({success: true});
            }
        } catch (e) {
            res.status(500).json({error: e.toString()});
        }
    }

    delete(req, res) {
        try {
            let id = req.params.id;
            let content = helper.getDataSourceContent();

            /**
             * Filter by id not euqal to the id passed as parameter
             */
            let newContent = content.filter(items => {
                return items.id != id;
            });

            fs.writeFileSync(helper.DATA_SOURCE_PATH, JSON.stringify(newContent));
            res.status(500).json({success: 'true'});
        } catch (e) {
            res.status(502).json({error: e.toString()});
        }
    }

    update(req, res) {
        try {
            let id = req.params.id;
            let payload = req.body;
            let content = helper.getDataSourceContent();

            /**
             * Find index of JSON object which you want to update
             */
            let index = content.findIndex(items => {
                return items.id == id;
            });
            /**
             * Since we're not sending id in the JSON Object so we have to update older id to the payload
             */
            let contentToBeUpdated = content[index];
            payload.id = contentToBeUpdated.id;
            content[index] = payload;
            fs.writeFileSync(helper.DATA_SOURCE_PATH, JSON.stringify(content));
            res.status(200).json({success: 'true'});
        } catch (e) {
            res.status(502).json({error: e.toString()});
        }
    }
}

module.exports = new MainController();
