const express = require('express');
const router = express.Router();
const filmController = require('../controller/filmController');

router.get('/', filmController.index);
router.get('/:id/reviews', filmController.getReviews); // più specifica prima
router.get('/:id', filmController.show);              // meno specifica dopo
router.post('/:id/reviews', filmController.storeReview); // più specifica prima

module.exports = router;
