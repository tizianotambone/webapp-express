const express = require('express');
const router = express.Router();
const filmController = require('../controller/filmController');


router.get('/', filmController.index)
router.get('/:id', filmController.show)

module.exports = router;