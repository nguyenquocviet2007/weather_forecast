import { WeatherService } from "../services/weather.service";

import { SuccessResponse } from "../core/success.response";
import { Request, Response, NextFunction } from "express";



export class WeatherController {
    getCurrentWeather = async(req: Request, res: Response, next: NextFunction) => {
        const city = req.query.city as string;
        new SuccessResponse({
            message: 'Get Current Weather Successfully!',
            metadata: await WeatherService.getCurrentWeather(city)
        }).send(res)
    }
    getForeCastWeather = async(req: Request, res: Response, next: NextFunction) => {
        const city = req.query.city as string;
        const day = req.query.day as string;
        new SuccessResponse({
            message: 'Get Forecast Weather Successfully!',
            metadata: await WeatherService.getForecastWeather(city, day)
        }).send(res)
    }
}


