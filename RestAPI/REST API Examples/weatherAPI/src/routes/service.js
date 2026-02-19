const { Router } = require('express');
const { z } = require('zod');
const axios = require('axios');
const validate = require('../middlewares/validate');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/apiError');

const router = Router();
const cache = new Map();
const TTL_MS = 60 * 1000;

const cityQuerySchema = z.object({
  city: z.string().trim().min(1)
});

const latLonQuerySchema = z.object({
  lat: z.coerce.number().min(-90).max(90),
  lon: z.coerce.number().min(-180).max(180)
});

function getCache(key) {
  const item = cache.get(key);
  if (!item) {
    return null;
  }
  if (item.expiresAt <= Date.now()) {
    cache.delete(key);
    return null;
  }
  return item.value;
}

function setCache(key, value) {
  cache.set(key, {
    value,
    expiresAt: Date.now() + TTL_MS
  });
}

async function fetchWeather(lat, lon) {
  const weatherResponse = await axios.get('https://api.open-meteo.com/v1/forecast', {
    params: {
      latitude: lat,
      longitude: lon,
      current: 'temperature_2m,wind_speed_10m'
    },
    timeout: 5000
  });

  return weatherResponse.data;
}

router.get(
  '/weather',
  validate(cityQuerySchema, 'query'),
  asyncHandler(async (req, res) => {
    const city = req.query.city;
    const cacheKey = 'city:' + city.toLowerCase();

    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ cached: true, data: cached });
    }

    const geoResponse = await axios.get('https://geocoding-api.open-meteo.com/v1/search', {
      params: {
        name: city,
        count: 1
      },
      timeout: 5000
    });

    const result = geoResponse.data && geoResponse.data.results && geoResponse.data.results[0];
    if (!result) {
      throw new ApiError(404, 'City not found', 'NOT_FOUND');
    }

    const weather = await fetchWeather(result.latitude, result.longitude);

    const payload = {
      city: result.name,
      latitude: result.latitude,
      longitude: result.longitude,
      weather
    };

    setCache(cacheKey, payload);
    return res.json({ cached: false, data: payload });
  })
);

router.get(
  '/weather/latlon',
  validate(latLonQuerySchema, 'query'),
  asyncHandler(async (req, res) => {
    const lat = req.query.lat;
    const lon = req.query.lon;
    const cacheKey = 'latlon:' + lat + ':' + lon;

    const cached = getCache(cacheKey);
    if (cached) {
      return res.json({ cached: true, data: cached });
    }

    const weather = await fetchWeather(lat, lon);
    const payload = {
      latitude: lat,
      longitude: lon,
      weather
    };

    setCache(cacheKey, payload);
    return res.json({ cached: false, data: payload });
  })
);

module.exports = router;
