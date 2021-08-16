const express = require('express')
const router = express.Router()
const controller = require('../controller');

router.get('/', controller.get);
router.post('/', controller.set);
router.delete('/', controller.delete);
router.put('/', controller.update);

module.exports = router;
