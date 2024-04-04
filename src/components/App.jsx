import React, { useState, useEffect } from 'react'; // Importer les hooks useState et useEffect depuis React
import Header from './Header'; // Importer le composant Header depuis le fichier Header.js
import '../styles/App.css'; // Importer les styles CSS pour le composant App
import Weather from './Weather'; // Importer le composant Weather depuis le fichier Weather.js
import axios from 'axios'; // Importer axios pour effectuer des requêtes HTTP

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY; // Stocker la clé API dans une constante

function App() { // Déclaration du composant fonctionnel App
  const [cityName, setCityName] = useState(''); // Déclaration d'un état cityName avec useState pour stocker le nom de la ville
  const [weatherData, setWeatherData] = useState(null); // Déclaration d'un état weatherData avec useState pour stocker les données météorologiques

  useEffect(() => { // Utilisation de useEffect pour effectuer des actions au chargement et à chaque mise à jour de cityName
    const fetchWeatherData = async (city) => { // Définition d'une fonction asynchrone pour récupérer les données météorologiques
      try { // Gestion des erreurs avec try...catch
        const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=5&aqi=no&alerts=no`); // Effectuer une requête HTTP GET pour récupérer les données météorologiques
        setWeatherData(response.data); // Mettre à jour l'état weatherData avec les données reçues de l'API
        console.log('Prévisions météo pour 5 jours:', response.data); // Afficher les données météorologiques dans la console
      } catch (error) { // Gérer les erreurs potentielles
        console.error('Erreur lors de la récupération des données météo:', error); // Afficher l'erreur dans la console
      }
    };

    const defaultCity = "Lyon"; // Définir la ville par défaut

    if (cityName === '') { // Vérifier si aucun nom de ville n'a été saisi
      if ("geolocation" in navigator) { // Vérifier si la géolocalisation est prise en charge par le navigateur
        navigator.geolocation.getCurrentPosition(function (position) { // Obtenir la position actuelle de l'utilisateur
          const { latitude, longitude } = position.coords; // Extraire les coordonnées de la position
          axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${latitude},${longitude}`) // Effectuer une requête HTTP GET pour obtenir les données météorologiques actuelles
            .then(response => {
              const city = response.data.location.name; // Extraire le nom de la ville à partir des données de localisation
              fetchWeatherData(city); // Appeler la fonction fetchWeatherData avec le nom de la ville récupéré
            })
            .catch(error => {
              console.error('Erreur lors de la récupération des données météo:', error); // Afficher l'erreur dans la console en cas d'échec
              fetchWeatherData(defaultCity); // Utiliser la ville par défaut en cas d'erreur
            });
        });
      } else {
        console.log("La géolocalisation n'est pas prise en charge par ce navigateur."); // Afficher un message si la géolocalisation n'est pas prise en charge par le navigateur
        fetchWeatherData(defaultCity); // Utiliser la ville par défaut si la géolocalisation n'est pas disponible
      }
    } else {
      fetchWeatherData(cityName); // Utiliser le nom de la ville saisi par l'utilisateur pour récupérer les données météorologiques
    }
  }, [cityName]); // Effectuer cette action à chaque mise à jour de cityName

  const handleCityInputChange = (event) => { // Fonction pour mettre à jour l'état cityName lorsqu'un utilisateur saisit une ville
    setCityName(event.target.value); // Mettre à jour l'état cityName avec la valeur saisie par l'utilisateur
  };

  return ( // Rendu du composant App
    <div className="App"> {/* Début du conteneur principal */}
      <Header /> {/* Affichage du composant Header */}
      <Weather weatherData={weatherData} cityName={cityName} onCityChange={handleCityInputChange} /> {/* Affichage du composant Weather avec les données météorologiques, le nom de la ville et la fonction de mise à jour */}
    </div> // Fin du conteneur principal
  );
}

export default App; // Exporter le composant App par défaut pour pouvoir l'utiliser dans d'autres fichiers
