import React, { useState, useEffect } from 'react';
import Header from './Header';
import '../styles/App.css';
import Weather from './Weather';
import axios from 'axios';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;

function App() {
  const [cityName, setCityName] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [selectedCities, setSelectedCities] = useState([]);

  /////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    // Récupérer les villes depuis le localStorage lors du chargement de l'application
    const storedCities = localStorage.getItem('selectedCities');
    if (storedCities) {
      setSelectedCities(JSON.parse(storedCities));
    }
  }, []);

  useEffect(() => {
    // Mettre à jour le localStorage lorsque les villes sélectionnées changent
    localStorage.setItem('selectedCities', JSON.stringify(selectedCities));
  }, [selectedCities]);

//////////////////////////////////////////////////////////////////////:

  useEffect(() => {
    const fetchWeatherData = async (city) => {
      try {
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=no&alerts=no`);
        setWeatherData(response.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    const defaultCity = "Lyon";

    if (cityName === '') {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function (position) {
          const { latitude, longitude } = position.coords;
          axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`)
            .then(response => {
              const city = response.data.location.name;
              fetchWeatherData(city);
            })
            .catch(error => {
              console.error('Error fetching weather data:', error);
              fetchWeatherData(defaultCity);
            });
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
        fetchWeatherData(defaultCity);
      }
    } else {
      fetchWeatherData(cityName);
    }
  }, [cityName]);



  const handleCityInputChange = (event) => {
    
    setCityName(event.target.value);
  };
  //////////////////////////////////////////////////////////////////////
  const handleRemoveCity = (city) => {
    // Supprimer la ville de la liste des villes sélectionnées
    setSelectedCities(selectedCities.filter(selectedCity => selectedCity !== city));
  };

  const handleCityClick = (city) => {
    // Ajouter la ville sélectionnée à la liste des villes
    setSelectedCities([...selectedCities, city]);

    setCityName(city);
  };
  /////////////////////////////////////////////////////////////////////////////

  return (
    <div className="App">
      <Header />
      <Weather
        weatherData={weatherData}
        cityName={cityName}
        onCityChange={handleCityInputChange}
        onCityClick={handleCityClick}
        selectedCities={selectedCities}
      />
    </div>
  );
}

export default App;
