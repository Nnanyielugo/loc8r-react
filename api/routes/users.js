const router = require('express').Router();

const upload = require('../helpers/multer').upload;
const auth = require('../helpers/auth');
const user = require('../controllers/users');

router.get('/me', auth.required, user.getUser);
router.post('/', upload.single('imageSrc'), user.signUp);
router.post('/login', user.login);

module.exports = router;