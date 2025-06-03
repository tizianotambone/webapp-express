const express = require('express');
const router = express.Router();
const filmController = require('../controller/filmController');


router.get('/', filmController.index)
router.get('/:id', filmController.show)
router.get('/:id/reviews', filmController.getReviews)
module.exports = router;