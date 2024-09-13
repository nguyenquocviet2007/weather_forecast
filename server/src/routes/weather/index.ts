import { Router } from 'express';
import asyncHandler from '../../helper/asyncHandler';
import { WeatherController } from '../../controllers/weather.controller';

const router = Router();
const weatherController = new WeatherController();


router.get('/current', asyncHandler(weatherController.getCurrentWeather))
router.get('/forecast', asyncHandler(weatherController.getForeCastWeather))

export default router;