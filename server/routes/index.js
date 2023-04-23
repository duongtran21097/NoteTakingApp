const express = require('express')
const router = express.Router();
const mainController = require('../controller/mainController');

/* App Routes*/
router.get('/',mainController.homePage)
router.get('/manage',mainController.manageList)

module.exports = router;