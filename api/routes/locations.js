const router = require('express').Router();

const auth = require('../helpers/auth');
const locations = require('../controllers/locations');
const reviews = require('../controllers/reviews');

router.get('/', locations.listLocationsByDistance);
router.post('/', locations.create);
router.get('/:id', locations.readSingle);
router.put('/:id', locations.update);
router.delete('/:id', locations.delete);

router.post('/:id/review', reviews.create);

module.exports = router;