import React, { useState, useEffect } from 'react';
import Days from './Days';
import '../styles/Weather.css';
import dayjs from 'dayjs';
import TemperatureChart from './TemperatureChart';
import axios from 'axios';

function Weather({ weatherData, cityName, onCityChange, selectedCities, onAddCityClick }) {
    const [nextFiveDays, setNextFiveDays] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedDayWeather, setSelectedDayWeather] = useState(null);
    const [selectedCitiesWeather, setSelectedCitiesWeather] = useState([]);
/////////////////////////////////////////////////////////////////////////////
    useEffect(() => {
        const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
        const fetchWeatherData = async (city) => {
            try {
                const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=no&alerts=no`);
                return response.data;
            } catch (error) {
                console.error(`Error fetching weather data for ${city}:`, error);
                return null;
            }
        };

        const fetchDataForSelectedCities = async () => {
            const citiesWeather = await Promise.all(selectedCities.map(fetchWeatherData));
            setSelectedCitiesWeather(citiesWeather.filter(Boolean));
        };

        fetchDataForSelectedCities();
    }, [selectedCities]);
    ////////////////////////////////////////////////////////////////////////////////////////

    useEffect(() => {
        if (weatherData && weatherData.forecast && weatherData.forecast.forecastday.length > 0) {
            setSelectedDay(dayjs(weatherData.forecast.forecastday[0].date).format('dddd'));
            setSelectedDayWeather(weatherData.forecast.forecastday[0]);
        }
    }, [weatherData]);


    useEffect(() => {
        if (weatherData && weatherData.forecast && weatherData.forecast.forecastday.length > 0) {
            setSelectedDay(dayjs(weatherData.forecast.forecastday[0].date).format('dddd'));
            setSelectedDayWeather(weatherData.forecast.forecastday[0]);
        }
    }, [weatherData]);

    const handleDayClick = (day) => {
        setSelectedDay(day);
        const selectedDayData = weatherData?.forecast?.forecastday.find((item) => dayjs(item.date).format('dddd') === day);
        setSelectedDayWeather(selectedDayData);
    };


    return (
        <div className="row">
            <div className="col s12 m6 push-m3">
                <div className="weather card blue-grey darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Météo</span>
                        <input className='textWhite' type="text" placeholder="Entrez le nom de la ville" value={cityName} onChange={onCityChange} />
                        {selectedCities.map((city, index) => (
                            <div key={index} className="selected-city">
                                <span>{city}</span>
                                <button onClick={() => onAddCityClick(city)}>Ajouter</button>
                            </div>
                        ))}
                        <p><img className='iconImage' src={selectedDayWeather && selectedDayWeather.day.condition.icon} alt="Weather icon" /></p>
                        {selectedDayWeather && (
                            <>
                                <span className="temperature">{selectedDayWeather.day.avgtemp_c}°</span>
                                <div className="wind">Vent {selectedDayWeather.day.maxwind_kph} km/h ({selectedDayWeather.day.maxtemp_c}°)</div>
                                <TemperatureChart temperatures={selectedDayWeather.hour.map(hour => hour.temp_c)} />
                            </>
                        )}
                    </div>
                    <Days nextFiveDays={nextFiveDays} onDayClick={handleDayClick} selectedDay={selectedDay} />
                </div>
            </div>
            <div className="selected-cities">
                {selectedCitiesWeather.map((cityWeather, index) => (
                    <div key={index} className="city-weather">
                        <h2>{cityWeather.location.name}</h2>
                        {/* Afficher les informations météorologiques pour chaque ville ici */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Weather;
