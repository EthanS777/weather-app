import { useEffect } from 'react'
import CityCard from '../CityCard'
import type { CityWeather } from '../types/CityWeather'
import type { CityOption } from '../types/CityOption'
import '../App.css'

type Props = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  cities: CityWeather[];
  cityOptions: CityOption[];
  error: string;
  searchCities: (query: string) => void;
  searchWeather: (
    lat: number,
    lon: number,
    state?: string
  ) => void;
  deleteCity: (lat: number, lon: number) => void;
  setSelectedCity: (
    city: CityWeather | null
  ) => void;
  setCityOptions: React.Dispatch<React.SetStateAction<CityOption[]>>;
  setCities: React.Dispatch<React.SetStateAction<CityWeather[]>>;
  darkMode: boolean;
};


export default function YourCitiesPage({
    input, 
    setInput, 
    cities, 
    cityOptions, 
    error, 
    searchCities, 
    searchWeather,
    deleteCity,
    setSelectedCity,
    setCityOptions,
    setCities,
    darkMode
}: Props) {

    // Ensure weather info updates when page refreshes/opens
  const refreshCities = async () => {
      console.log("refreshCities called", new Date().toLocaleTimeString());
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;
    const updatedCities = await Promise.all(
      cities.map(async (city) => {
        const fetchUrl = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=imperial&appid=${apiKey}`);
        const data = await fetchUrl.json();
        return {
          ...city,
          feelsLike: Math.round(data.main.feels_like),
          temp: Math.round(data.main.temp),
          desc: data.weather[0].main,
          detailedDesc: data.weather[0].description,
          humidity: data.main.humidity,
          windSpeed: data.wind.speed,
          icon: data.weather[0].icon,
          timezone: data.timezone,
          sunrise: data.sys.sunrise,
          sunset: data.sys.sunset
        }
      })
    );
    setCities(prevCities => 
      prevCities.map(prevCity => {
        const updated = updatedCities.find(city => city.lat === prevCity.lat && city.lon === prevCity.lon);
        return updated ?? prevCity
      })
    );
  }

    // Refresh cities on app start + every 5 minutes
    useEffect(() => {
      if (cities.length > 0) {
        refreshCities();
      };

      const fiveMinuteRefresh = setInterval(() => {
        refreshCities();
      }, 300000);

      return () => clearInterval(fiveMinuteRefresh);
    }, []);

    return (
       <div style={{
          padding: "30px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "15px"
        }}>
            <h1 id="addText">Your Cities</h1>

            <input
              placeholder="Search City"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  searchCities(input);
                }
              }}
              style={{ height: "25px", border: `${darkMode ? '2px solid whitesmoke' : '2px solid black'}` }}
            />

            <button
              id="searchButton"
              onClick={() => {
                searchCities(input);
              }}
            >
              Search
            </button>

            <div id="cityOptionsList">
              {cityOptions.map((city, index) => (
                <button
                  key={index}
                  onClick={() => {
                    searchWeather(city.lat, city.lon, city.state);
                    setCityOptions([]);
                  }}
                >
                  {city.name} {city.state ? `- ${city.state}` : ""}, {city.country}
                </button>
              ))}
            </div>

            <p style={{color: `${darkMode ? 'lightcoral' : 'darkred'}`}}>{error}</p>

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
                    darkMode={darkMode}
                  />
                ))}
              </div>
            }
        </div>
    )
}