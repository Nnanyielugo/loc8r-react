const router = require('express').Router();

const auth = require('../helpers/auth');
const locations = require('../controllers/locations');

router.get('/', locations.listLocationsByDistance);
router.post('/', locations.createLocation);

module.exports = router;