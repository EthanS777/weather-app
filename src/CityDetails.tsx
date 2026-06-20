import type {CityWeather} from './types/CityWeather'
import './App.css'
import teacupIcon from './assets/teacupIcon.png'

type Props = {
    city: CityWeather;
    goBack: () => void;
}

// CityDetails component: Renders individual city info
export default function CityDetails({city, goBack}: Props) {

const cityTime = new Date(
  Date.now() + city.timezone * 1000
).toLocaleTimeString([], {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "UTC"
});

const sunriseTime = new Date(
 (city.sunrise + city.timezone) * 1000
).toLocaleTimeString([], {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "UTC"
}
);

const sunsetTime = new Date(
 (city.sunset + city.timezone) * 1000
).toLocaleTimeString([], {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "UTC"
}
);
   return (
    <>
    <div id="cityDetails">
    <div id="cityDetailsBox" style={{color: 'white'}}>
    <h1>{city.cityName}</h1>
    {city.stateName == "England" ? <img src={teacupIcon} alt="UK tea" width="75px" height="75px"></img> : ""}
    <h3>{cityTime}</h3>
    <p>{city.detailedDesc.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
    <p>{city.temp}F</p>
    <p>Feels Like: {city.feelsLike}F</p>
    <br></br>
    <p>Wind: {Math.floor(city.windSpeed)}mph</p>
    <p>{city.humidity}% Humidity</p>
    <br></br>
    <p id="sunriseText">Sunrise: {sunriseTime}</p>
    <p id="sunsetText">Sunset: {sunsetTime}</p>
    </div>
    <button className="backButton" onClick={goBack}>Back</button>
    </div>
    </>
   )
}