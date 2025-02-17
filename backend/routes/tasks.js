const express = require('express');
const router = express.Router();
const RCUD = require('../controllers/tasksController');

router.route('/')
    .get(RCUD[0])
    .post(RCUD[1])
    .put(RCUD[2])
    .delete(RCUD[3]);

module.exports = router;