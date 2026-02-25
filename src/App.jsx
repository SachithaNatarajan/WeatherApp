import { useState } from "react";
import { WiThermometer, WiHumidity, WiBarometer, WiCloud } from "react-icons/wi";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_KEY = "API_KEY_APP"; 

  const getWeather = async () => {
    if (!city) return;

    setLoading(true);
    setError("");
    setWeather(null);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "City not found");
      }

      setWeather(data);

    } catch (err) {
      setError(err.message);
    }

    setLoading(false);
  };

  return (
    <div className="container">
      <h1>Weather Dashboard</h1>

      <div className="search-box">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={getWeather}>Get Weather</button>
      </div>

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {weather && (
  <div className="card">
    <h2>{weather.name}, {weather.sys.country}</h2>

    <p>
      <WiThermometer size={24} /> 
      <strong> Temperature:</strong> {weather.main.temp} °C
    </p>

    <p>
      <WiHumidity size={24} /> 
      <strong> Humidity:</strong> {weather.main.humidity}%
    </p>

    <p>
      <WiBarometer size={24} /> 
      <strong> Pressure:</strong> {weather.main.pressure} hPa
    </p>

    <p>
      <WiCloud size={24} /> 
      <strong> Condition:</strong> {weather.weather[0].description}
    </p>
  </div>
)}
    </div>
  );
}

export default App;