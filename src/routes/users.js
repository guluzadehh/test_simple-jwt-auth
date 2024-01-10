const express = require('express');
const controllers = require('../controllers/users');
const upload = require('multer')()

const router = express.Router();

router.post('/login', controllers.login);
router.post('/register', upload.single('image'), controllers.register);

module.exports = router;