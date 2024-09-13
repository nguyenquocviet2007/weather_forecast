import { useState } from 'react'

import './App.css'

import search from './assets/icons/search.svg'
import { useStateContext } from './Context'
import BackgroundLayout from './Components/BackgroundLayout'
import WeatherCard from './Components/WeatherCard'
import MiniCard from './Components/MiniCard'
import axios from 'axios'

function App() {
  
  const [input, setInput] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [email, setEmail] = useState('')
  const [city, setCity] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const {weather, location, forecastWeather, place, setPlace} = useStateContext()

  const submitCity = () => {
    setPlace(input)
    setInput('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    
    try {
      const response = await axios.post('http://127.0.0.1:8080/api/subscription/subscribe', {
        email: email,
        city: city
      })
      if (response.data.message === 'A Confirmation email has been send to email') {
        alert(response.data.message)
      }
    } catch (error) {
      console.log(error)
      alert('An Error Occur When Subscribing')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='w-full h-screen text-white px-8'>
        <nav className='w-full p-3 flex justify-between items-center'>
          <h1 className='font-bold tracking-wide text-3x1'>Weather App</h1>
          <div className='bg-white w-[15rem] overflow-hidden shadow-2xl rounded flex items-center p-2 gap-2'>
            <img src={search} alt="search" className='w-[1.5rem] h-[1.5rem]'/>
            <input onKeyUp={(e) => {
              if(e.key === 'Enter') {
                // Submit Form
                submitCity()
              }
            }} type="text" className='focus:outline-none w-full text-[#212121] text-lg' value={input} onChange={e => setInput(e.target.value)}/>
          </div>
          <button className='bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-700 transition duration-300 mt-4' onClick={() => setShowForm(true)}>
            Subscribe For Daily Weather Information
          </button>
        </nav>
        <div className={`${showForm ? 'blur-sm' : ''}`}>
          <BackgroundLayout />
          <main className='w-full flex flex-wrap gap-8 py-4 px-[10%] items-center justify-center'>
              <WeatherCard
                temperature={weather.temperature}
                wind={weather.wind}
                humidity={weather.humidity}
                city={location}
                condition={weather.condition}
                iconString={weather.icon}
                time={weather.time}
              />

              <div className='flex justify-center gap-8 flex-wrap w-[60%]'>
                {
                  forecastWeather.map(curr => {
                    return (
                      <MiniCard 
                        time={curr.date}
                        temperature={curr.temperature}
                        wind={curr.wind}
                        humidity={curr.humidity}
                      />
                    )
                  })
                }
              </div>
          </main>
        </div>
        {showForm && (
          <div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm'>
            <div className='bg-white p-6 rounded shadow-lg w-[20rem]'>
              <h2 className='text-2xl font-bold mb-4 text-center text-black'>Subscribe</h2>
              <form onSubmit={handleSubmit}>
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>Email:</label>
                  <input
                    type="email"
                    className='w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 text-[#212121]'
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                  />
                </div>
                <div className='mb-4'>
                  <label className='block text-gray-700 text-sm font-bold mb-2'>City:</label>
                  <input
                    type="text"
                    className='w-full px-3 py-2 border rounded focus:outline-none focus:border-blue-500 text-[#212121]'
                    placeholder="Enter your city"
                    value={city}
                    onChange={e => setCity(e.target.value)}
                  />
                </div>
                <div className='flex justify-between items-center'>
                  <button 
                    type="submit"
                    disabled={isLoading} 
                    className={`bg-blue-500 text-white px-4 py-2 rounded shadow-lg transition duration-300 ${isLoading ? 'bg-opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                  >
                    {isLoading ? 'Subscribing...' : 'Subscribe'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)} // Close the modal
                    className='text-gray-500 hover:text-gray-700'>
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}  
    </div>
  )
}

export default App
