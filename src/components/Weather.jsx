import React, { useState, useEffect } from 'react';
import Days from './Days';
import '../styles/Weather.css';
import dayjs from 'dayjs';
import TemperatureChart from './TemperatureChart';

function Weather({ weatherData, cityName, onCityChange }) {
    const [nextFiveDays, setNextFiveDays] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedDayWeather, setSelectedDayWeather] = useState(null);

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
                        <p><img className='iconImage' src={selectedDayWeather && selectedDayWeather.day.condition.icon} alt="Weather icon" /></p>
                        {selectedDayWeather && (
                            <>
                                <span className="temperature">{selectedDayWeather.day.avgtemp_c}°</span>
                                <div className="wind">Vent {selectedDayWeather.day.maxwind_kph} km/h ({selectedDayWeather.day.wind_dir})</div>
                                {/* Afficher d'autres données météorologiques selon vos besoins */}
                                <TemperatureChart temperatures={selectedDayWeather.hour.map(hour => hour.temp_c)} />
                            </>
                        )}
                    </div>
                    <Days nextFiveDays={nextFiveDays} onDayClick={handleDayClick} selectedDay={selectedDay} />
                </div>
            </div>
        </div>
    );
}

export default Weather;
