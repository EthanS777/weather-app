import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import './App.css'
import Navbar from './Navbar'
import type { CityWeather } from './types/CityWeather'
import type { CityOption } from './types/CityOption'

import CityDetailsPage from './pages/CityDetailsPage'
import HomePage from './pages/HomePage'
import YourCitiesPage from './pages/YourCitiesPage'

function App() {
  const [input, setInput] = useState("");
  const [cities, setCities] = useState<CityWeather[]>(() => {
    const savedCities = localStorage.getItem('cities');
    return savedCities ? JSON.parse(savedCities) : [];
  });
  const [selectedCity, setSelectedCity] = useState<CityWeather | null>(null);
  const [cityOptions, setCityOptions] = useState<CityOption[]>([]);
  const [error, setError] = useState(" ");
  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : true;
  });

  // Search for all options based on location typed in - takes in user input
  const searchCities = async (query: string) => {
    setError("");

    if (!query.trim()) {
      setError("Please enter a city.");
      return;
    }

    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    const fetchUrl = await fetch(
      `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
    );

    const data = await fetchUrl.json();

    if (data.length === 0) {
      setError("City not found.");
      return;
    }

    setCityOptions(data);
  }

  // Search weather for specific city - takes in latitude, longitude, state
  const searchWeather = async (lat: number, lon: number, state?: string) => {
    setInput("");

    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    try {
      // Fetch, grab JSON data
      const fetchUrl = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`
      );
      const data = await fetchUrl.json();

      if (!fetchUrl.ok) {
        throw new Error(data.message || "Error fetching weather");
      }

      // If city already exists, don't add it to setCities
      const cityExists = cities.some(city => city.lat == lat && city.lon == lon);
      if (cityExists) {
        setError("Location already added!");
        setTimeout(() => setError(""), 2000);
        return;
      }

      // Set cities array with individual city objects
      setCities((prevCities) => [
        ...prevCities,
        {
          cityName: data.name,
          stateName: state,
          feelsLike: Math.round(data.main.feels_like),
          temp: Math.round(data.main.temp),
          desc: data.weather[0].main,
          lat,
          lon,
          detailedDesc: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          icon: data.weather[0].icon,
          timezone: data.timezone,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset
        }
      ]);
      console.log(data);
    }

    catch {
      setError("Please type in a valid city!")
      setTimeout(() => setError(""), 2000)
    }
  }

  // Remove an individual city if delete button pressed
  const deleteCity = (lat: number, lon: number) => {
    setCities((prevCities) =>
      prevCities.filter((city => city.lat !== lat || city.lon !== lon))
    )
  }

  // Save cities with local storage 
  useEffect(() => {
    localStorage.setItem('cities', JSON.stringify(cities));
  }, [cities]);

  // Save dark mode with local storage
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <div
      id="app"
      className={darkMode ? "dark" : "light"}
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >

      <Navbar darkMode={darkMode} setDarkMode={setDarkMode}/>

      <main>
        <Routes>
          {/* Home Page */}
          <Route path="/" element={<HomePage darkMode={darkMode}/>} />

          {/* Your Cities Page */}
          <Route path="/cities" element={
            <YourCitiesPage
              input={input}
              setInput={setInput}
              cities={cities}
              cityOptions={cityOptions}
              error={error}
              searchCities={searchCities}
              searchWeather={searchWeather}
              deleteCity={deleteCity}
              setSelectedCity={setSelectedCity}
              setCityOptions={setCityOptions}
              setCities={setCities}
              darkMode={darkMode}
            />} />

          {/* City Details Page */}
          <Route path="/details" element={
            <CityDetailsPage
              selectedCity={selectedCity}
              setSelectedCity={setSelectedCity}
            />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;