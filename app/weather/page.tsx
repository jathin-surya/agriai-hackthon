"use client"

import React, { useEffect, useState } from "react"
import Link from "next/link"

interface WeatherData {
  list: {
    dt_txt: string
    main: {
      temp: number
    }
    weather: {
      description: string
      icon: string
    }[]
  }[]
}

export default function WeatherPage() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const apiKey = "900d930cf9f9275767c142f3c8d7ec63"
        const lat = "37.7749" // Replace with actual latitude
        const lon = "-122.4194" // Replace with actual longitude
        const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`

        const response = await fetch(url)
        const data = await response.json()
        setWeatherData(data)
        setLoading(false)
      } catch (error) {
        console.error("Error fetching weather data:", error)
        setError(true)
        setLoading(false)
      }
    }

    fetchWeather()
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <header className="weather-header py-6 bg-gradient-to-r from-[#4CAF50] to-[#81C784] text-white">
        <h1 className="text-3xl font-bold mb-2">5-Day Weather Forecast</h1>
        <Link
          href="/"
          className="back-button inline-block px-4 py-2 bg-[#555] hover:bg-[#333] rounded-lg transition-colors"
        >
          ⬅ Back to Home
        </Link>
      </header>

      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="weather-container flex justify-center flex-wrap gap-4">
            {loading && <p className="loading text-lg">Fetching weather data...</p>}
            {error && <p className="error-message text-red-500 text-lg">Failed to load weather data.</p>}

            {weatherData &&
              weatherData.list &&
              weatherData.list
                .reduce<{ [key: string]: { temp: number; weather: string; icon: string }[] }>((acc, item) => {
                  const date = new Date(item.dt_txt).toDateString();
                  const temp = item.main.temp;
                  const weather = item.weather[0].description;
                  const icon = item.weather[0].icon;

                  if (!acc[date]) {
                    acc[date] = [];
                  }
                  acc[date].push({ temp, weather, icon });
                  return acc;
                }, {})
                .map((date, index) => {
                  const dateString = Object.keys(date)[index];
                  return (
                    <div key={index} className="date-group">
                      {Object.values(date).map((item: { temp: number; weather: string; icon: string; dt_txt: string }, idx) => (


                        <div key={idx} className="weather-card bg-white p-4 rounded-lg shadow-md">
                          <h3 className="font-semibold text-xl mb-2">{dateString}</h3>
                          <p className="text-sm">{item.dt_txt}</p>
                          <div className="flex justify-center">
                            <img
                              src={`https://openweathermap.org/img/wn/${item.icon}.png`}
                              alt="Weather Icon"
                              width={50}
                              height={50}
                            />
                          </div>
                          <p className="capitalize mb-1">{item.weather}</p>
                          <p className="font-bold text-2xl">{item.temp.toFixed(1)}°C</p>
                        </div>
                      ))}
                    </div>
                  );
                })}
          </div>
        </div>
      </main>

      <footer className="bg-[#333] text-white py-4">
        <div className="container mx-auto px-4">
          <p>© 2025 AGRI GUARD AI - Smart Agriculture Solutions</p>
        </div>
      </footer>
    </div>
  )
}
