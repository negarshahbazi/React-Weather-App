import React, { useEffect, useState } from 'react';
import Days from './Days';
import '../styles/Weather.css';

import axios from 'axios';

function Weather() {
  const [weatherData, setWeatherData] = useState(null);
  const [selectedDayWeather, setSelectedDayWeather] = useState(null);
  const API_KEY = ' 972532158bb94a7c8b9112136240304';

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=Lyon&days=5`);
        setWeatherData(response.data);
        // Set the initial selected day weather data
        setSelectedDayWeather(response.data.forecast.forecastday[0]);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  // Function to handle day selection
  const handleDaySelect = (dayWeather) => {
    setSelectedDayWeather(dayWeather);
  };

  return (
    <div className="row">
      <div className="col s12 m6 push-m3">
        <div className="weather card blue-grey darken-1">
          <div className="card-content white-text">
            <span className="card-title">Lyon</span>
            <p><img className="iconImage"src={selectedDayWeather && selectedDayWeather.day.condition.icon} alt="sun icon" /></p>
            <span className="temperature">{selectedDayWeather && selectedDayWeather.day.avgtemp_c}°</span>
            <div className="wind">Vent {selectedDayWeather && selectedDayWeather.day.maxwind_kph}km/h ({selectedDayWeather && selectedDayWeather.day.wind_dir})</div>
          </div>
          <Days weatherData={weatherData} onDaySelect={handleDaySelect} />
        </div>
      </div>
    </div>
  );
}

export default Weather;
