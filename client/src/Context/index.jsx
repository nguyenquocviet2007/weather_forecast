import { useContext, createContext, useState, useEffect } from "react";
import axios from 'axios'

const StateContext = createContext()

export const StateContextProvider = ({children}) => {
    const [weather, setWeather] = useState({})
    const [forecastWeather, setForecastWeather] = useState([])
    const [place, setPlace] = useState('Ho Chi Minh')
    const [location, setLocation] = useState('')


    // fetch api
    const fetchWeather = async () => {
        const options = {
            method: 'GET',
            url: 'http://127.0.0.1:8080/api/weather/current',
            params: {
                city: place
            },
        }
        try {
            const response = await axios.request(options)
            console.log(response.data)
            setLocation(response.data.metadata.city)
            setWeather(response.data.metadata)
        } catch (error) {
            console.error(error)
            alert('This place does not exist')
        }
    }

    const fetchForecastWeather = async () => {
        const options = {
            method: 'GET',
            url: 'http://127.0.0.1:8080/api/weather/forecast',
            params: {
                city: place,
                day: 4
            },
        }
        try {
            const response = await axios.request(options)
            console.log(response.data)
            setForecastWeather(response.data.metadata)
        } catch (error) {
            console.error(error)
            alert('This place does not exist')
        }
    }

    

    useEffect(() => {
        fetchWeather()
    }, [place])

    useEffect(() => {
        fetchForecastWeather()
    }, [place])

    return (
        <StateContext.Provider value={{
            forecastWeather,
            weather,
            setPlace,
            location
        }}>
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext)