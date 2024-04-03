import Header from './Header.js';
import '../styles/App.css';
import Weather from './Weather.js';


function App() {
  const weatherData = {
    temperature: '15°C',
    weatherIcon: 'sun',
    windSpeed: '1km/h'
  };
  return (
    <div className="App">
      <Header />

      <Weather weatherData={weatherData}/>

    </div>
  );
}

export default App;
