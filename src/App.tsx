import { useState } from 'react'
import './App.css'
import CityCard from './CityCard'
import Navbar from './Navbar'

function App() {
 const [input, setInput] = useState("");

// cities: [{cityName: X, temp: Y, desc: Z}, {...}, ...]
const [cities, setCities] = useState<{
  cityName: string,
  temp: number,
  desc: string
}[]>([]);

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
      temp: Math.round(data.main.temp),
      desc: data.weather[0].main
    }
  ]);
  console.log(data);
  }

  catch {
    setError("Please type in a valid city!");
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
      backgroundColor: "darkblue",
      display: "flex",
      flexDirection: "column",
      color: "white"
    }}
  >

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

      <h1 id="addText">Add Cities</h1>

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
            cityName={city.cityName}
            temp={city.temp}
            desc={city.desc}
            removeCity={deleteCity}
          />
        ))}
      </div>

      <p id="errorText">{error}</p>

    </main>
  </div>
);
}

export default App;