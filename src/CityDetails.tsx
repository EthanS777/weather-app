import type {CityWeather} from './types/CityWeather'
import './App.css'

type Props = {
    city: CityWeather;
    goBack: () => void;
}

// CityDetails component: Renders individual city info
export default function CityDetails({city, goBack}: Props) {

   return (
    <div id="cityDetails">
    <h1>{city.cityName}</h1>
    <p>{city.temp}F</p>
    <p>Feels Like: {city.feelsLike}F</p>
    <p>{city.detailedDesc.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}</p>
    <br></br>
    <p>Wind: {Math.floor(city.windSpeed)}mph</p>
    <p>{city.humidity}% Humidity</p>
    <button onClick={goBack}>Back</button>
    </div>
   )
}