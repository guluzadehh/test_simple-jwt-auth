const express = require('express');
const router = express.Router();
const passport = require('passport');
const upload = require('multer')();

const controllers = require('../controllers/profiles');
const { isSameUser } = require('../middlewares/userPermission');

router.get('/', controllers.listUsers);

router.use(
  '/:id',
  passport.authenticate('jwt', { session: false }),
  isSameUser
)

router.route('/:id')
  .get(controllers.detailUser)
  .put(upload.single('image'), controllers.updateUser);

module.exports = router;