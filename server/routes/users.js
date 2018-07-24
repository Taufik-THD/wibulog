const express = require('express');
const router = express.Router();
const { GetProfile, Login, Register } = require('../controllers/controller_user')

/* GET users listing. */
router.get('/:id', GetProfile);

router.post('/', Login)

router.post('/register', Register)

module.exports = router;
