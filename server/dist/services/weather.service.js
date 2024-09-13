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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WeatherService = void 0;
const axios_1 = __importDefault(require("axios"));
const error_response_1 = require("../core/error.response");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class WeatherService {
    static getCurrentWeather(city) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.apiKey) {
                throw new error_response_1.BadRequestRequestError('Something went wrong');
            }
            const currentWeather = yield axios_1.default.get(process.env.WEATHER_CURRENT_API_URL + `?key=${this.apiKey}&q=${city}&aqi=no`);
            if (!currentWeather) {
                throw new error_response_1.NotFoundError('Cannot Find Weather Information');
            }
            const currentWeatherData = {
                time: currentWeather.data.location.localtime,
                city: currentWeather.data.location.name,
                temperature: currentWeather.data.current.temp_c,
                wind: currentWeather.data.current.wind_kph,
                humidity: currentWeather.data.current.humidity,
                condition: currentWeather.data.current.condition.text,
                icon: currentWeather.data.current.condition.icon
            };
            return currentWeatherData;
        });
    }
    static getForecastWeather(city, day) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.apiKey) {
                throw new error_response_1.BadRequestRequestError('Something went wrong');
            }
            const forecastWeather = yield axios_1.default.get(process.env.WEATHER_FORECAST_API_URL + `?key=${this.apiKey}&q=${city}&days=${parseInt(day) + 1}&aqi=no&alerts=no`);
            if (!forecastWeather) {
                throw new error_response_1.NotFoundError('Cannot Find Forecast Information');
            }
            let forecastWeatherData = [];
            for (let i = 1; i <= parseInt(day); i++) {
                forecastWeatherData.push({
                    date: forecastWeather.data.forecast.forecastday[i].date,
                    city: forecastWeather.data.location.name,
                    temperature: forecastWeather.data.forecast.forecastday[i].day.avgtemp_c,
                    wind: forecastWeather.data.forecast.forecastday[i].day.maxwind_kph,
                    humidity: forecastWeather.data.forecast.forecastday[i].day.avghumidity,
                    icon: forecastWeather.data.forecast.forecastday[i].day.condition.icon
                });
            }
            return forecastWeatherData;
        });
    }
}
exports.WeatherService = WeatherService;
WeatherService.apiKey = process.env.API_KEY;
