const router = require('express').Router();

router.use('/users', require('./users'));
router.use('/locations', require('./locations'));

module.exports = router;