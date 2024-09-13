import React from 'react'

const MiniCard = ({time, temperature, wind, humidity}) => {
  return (
    <div className='glassCard w-[10rem] h-[10rem] p-4 flex flex-col'>
      <p className='text-center'>
        {time}
      </p>
      <hr />
      <p className='text-center font-bold'>Temp: {temperature}&deg;C</p>
      <p className='text-center font-bold'>Wind: {wind} kph</p>
      <p className='text-center font-bold'>Humidity: {humidity}</p>
    </div>
  )
}

export default MiniCard
