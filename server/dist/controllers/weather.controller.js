"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherController = void 0;
const weather_service_1 = require("../services/weather.service");
const success_response_1 = require("../core/success.response");
class WeatherController {
    constructor() {
        this.getCurrentWeather = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const city = req.query.city;
            new success_response_1.SuccessResponse({
                message: 'Get Current Weather Successfully!',
                metadata: yield weather_service_1.WeatherService.getCurrentWeather(city)
            }).send(res);
        });
        this.getForeCastWeather = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const city = req.query.city;
            const day = req.query.day;
            new success_response_1.SuccessResponse({
                message: 'Get Forecast Weather Successfully!',
                metadata: yield weather_service_1.WeatherService.getForecastWeather(city, day)
            }).send(res);
        });
    }
}
exports.WeatherController = WeatherController;
