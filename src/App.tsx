import { useState } from 'react'
import './App.css'
import CityCard from './CityCard'
import CityDetails from './CityDetails'
import Navbar from './Navbar'
import WeatherBackground from './WeatherBackground'
import type { CityWeather } from './types/CityWeather'

function App() {
  const [input, setInput] = useState("");

  // cities: [{cityName: X, temp: Y, desc: Z}, {...}, ...]
  const [cities, setCities] = useState<CityWeather[]>([]);
  const [selectedCity, setSelectedCity] = useState<CityWeather | null>(null);

  const [error, setError] = useState(" ");

  let searchWeather = async (cityName: string) => {
    setError("");
    setInput("");

    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    try {
      const fetchUrl = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=imperial&appid=${apiKey}`
      );

      const data = await fetchUrl.json();

      if (!fetchUrl.ok) {
        throw new Error(data.message || "Error fetching weather");
      }

      setCities((prevCities) => [
        ...prevCities,
        {
          cityName: data.name,
          countryName: data.sys.country,
          feelsLike: Math.round(data.main.feels_like),
          temp: Math.round(data.main.temp),
          desc: data.weather[0].main,
          detailedDesc: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          icon: data.weather[0].icon
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
  let deleteCity = (cityName: string) => {
    setCities((prevCities) =>
      prevCities.filter((city => city.cityName !== cityName))
    )
  }

  return (
    <div
      id="app"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        color: "white"
      }}
    >

      {selectedCity && (
        <WeatherBackground weather={selectedCity.desc}/>
      )}

      <Navbar />

      <main
        style={{
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px"
        }}
      >
        {selectedCity ? (
          <CityDetails
            city={selectedCity}
            goBack={() => setSelectedCity(null)} />
        ) : (
          <>
            <h1 id="addText">Your Cities</h1>

            <input
              placeholder="Search City"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ height: "25px" }}
            />

            <button
              id="searchButton"
              onClick={() => {
                searchWeather(input);
              }}
            >
              Search
            </button>

            <p id="errorText">{error}</p>

            {cities.length == 0 ? <><br></br> <p id="noCitiesEntered">No saved cities! Yet, that is...</p></> :
              <div
                id="cityCard"
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "20px",
                  justifyContent: "center"
                }}
              >
                {cities.map((city, index) => (
                  <CityCard
                    key={index}
                    city={city}
                    removeCity={deleteCity}
                    setMoreInfo={setSelectedCity}
                  />
                ))}
              </div>
            }
          </>
        )
        }

      </main>
    </div>
  );
}

export default App;