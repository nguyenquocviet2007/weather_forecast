import axios from "axios"
import {BadRequestRequestError, NotFoundError} from "../core/error.response"
import dotenv from "dotenv"
dotenv.config()

export class WeatherService {
    private static apiKey = process.env.API_KEY

    static async getCurrentWeather(city: string) {
        if (!this.apiKey) {
            throw new BadRequestRequestError('Something went wrong')
        }

        const currentWeather = await axios.get(process.env.WEATHER_CURRENT_API_URL+`?key=${this.apiKey}&q=${city}&aqi=no`)
        if (!currentWeather) {
            throw new NotFoundError('Cannot Find Weather Information')
        }

        const currentWeatherData = {
            time: currentWeather.data.location.localtime,
            city: currentWeather.data.location.name,
            temperature: currentWeather.data.current.temp_c,
            wind: currentWeather.data.current.wind_kph,
            humidity: currentWeather.data.current.humidity,
            condition: currentWeather.data.current.condition.text,
            icon: currentWeather.data.current.condition.icon
        }

        return currentWeatherData
    }
    
    static async getForecastWeather(city: string, day: string) {
        if (!this.apiKey) {
            throw new BadRequestRequestError('Something went wrong')
        }

        const forecastWeather = await axios.get(process.env.WEATHER_FORECAST_API_URL+`?key=${this.apiKey}&q=${city}&days=${parseInt(day)+1}&aqi=no&alerts=no`)
        if (!forecastWeather) {
            throw new NotFoundError('Cannot Find Forecast Information')
        }

        let forecastWeatherData = []

        for (let i = 1; i <= parseInt(day); i++) {
            forecastWeatherData.push({
                date: forecastWeather.data.forecast.forecastday[i].date,
                city: forecastWeather.data.location.name,
                temperature: forecastWeather.data.forecast.forecastday[i].day.avgtemp_c,
                wind: forecastWeather.data.forecast.forecastday[i].day.maxwind_kph,
                humidity: forecastWeather.data.forecast.forecastday[i].day.avghumidity,
                icon: forecastWeather.data.forecast.forecastday[i].day.condition.icon
            })
        }
        return forecastWeatherData
    }
}