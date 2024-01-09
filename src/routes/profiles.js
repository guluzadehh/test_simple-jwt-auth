const express = require('express');
const router = express.Router();

const controllers = require('../controllers/profiles');

router.get('/', controllers.listUsers);
router.route('/:id')
  .get(controllers.detailUser)
  .put(controllers.updateUser);

module.exports = router;