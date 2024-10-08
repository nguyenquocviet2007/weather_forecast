import React, { useEffect, useState } from 'react'
import sun from '../assets/icons/sun.png'
import cloud from '../assets/icons/cloud.png'
import fog from '../assets/icons/fog.png'
import rain from '../assets/icons/rain.png'
import snow from '../assets/icons/snow.png'
import storm from '../assets/icons/storm.png'
import windy from '../assets/icons/windy.png'
import '../index.css'

const WeatherCard = ({
  temperature,
  wind,
  humidity,
  city,
  condition,
  iconString,
  time
}) => {
  const [icon, setIcon] = useState(sun)

  useEffect(() => {
    if(iconString) {
      if(iconString.toLowerCase().includes('cloud')) {
        setIcon(cloud)
      } else if (iconString.toLowerCase().includes('rain') || iconString.toLowerCase().includes('drizzle') || iconString.toLowerCase().includes('sleet')) {
        setIcon(rain)
      } else if (iconString.toLowerCase().includes('clear') || iconString.toLowerCase().includes('sun')) {
        setIcon(sun)
      } else if (iconString.toLowerCase().includes('mist') || iconString.toLowerCase().includes('fog')) {
        setIcon(fog)
      } else if (iconString.toLowerCase().includes('snow') || iconString.toLowerCase().includes('freezing') || iconString.toLowerCase().includes('ice')) {
        setIcon(snow)
      } else if (iconString.toLowerCase().includes('thunder')) {
        setIcon(storm)
      } else if (iconString.toLowerCase().includes('wind')) {
        setIcon(windy)
      }
    }
  }, [iconString])
  return (
    <div className='w-[22rem] min-w-[22rem] h-[30rem] glassCard p-4'>
      <div className='flex w-full just-center, items-center gap-4 mt-12 mb-4'>
        <img src={icon} alt="weather_icon" />
        <p className='font-bold text-5xl flex justify-center items-center'>{temperature} &deg;C</p>
      </div>
      <div className='font-bold text-center text-xl'>
        {city}
      </div>
      <div className='w-full flex justify-between items-center mt-4'>
        <p className='flex-1 text-center p-2'>{new Date().toDateString()}</p>
        <p className='flex-1 text-center p-2'>{time}</p>
      </div>
      <div className='w-full flex justify-between items-center mt-4 gap-4'>
        <div className='flex-1 text-center p-2 font-bold bg-blue-600 shadow rounded-lg'>Wind Speed <p className='font-normal'>{wind}</p></div>
        <div className='flex-1 text-center p-2 font-bold rounded-lg bg-green-600'>Humidity <p className='font-normal'>{humidity}</p></div>
      </div>
      <hr className='bg-slate-600' />
      <div className='w-full p-4 flex justify-center items-center text-3xl font-semibold'>
        {condition}
      </div>
    </div>
  )
}

export default WeatherCard
