const router = require('express').Router();

const auth = require('../helpers/auth');
const locations = require('../controllers/locations');

router.get('/', locations.listLocationsByDistance);
router.post('/', locations.create);
router.get('/:id', locations.readSingle);
router.put('/:id', locations.update);
router.delete('/:id', locations.delete);

module.exports = router;