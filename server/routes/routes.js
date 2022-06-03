const weather = require('../controllers/weather/weather.controller');
const uen  = require('../controllers/uen/uen.controller');

const express = require('express');
const router = express.Router();

router.get("/weatherRetrieval", weather.getWeather)
router.post("/uenValidation", uen.validateUEN)

module.exports = router;