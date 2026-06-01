import deleteIcon from './assets/deleteIcon.png'
import './App.css'
import type {CityWeather} from './types/CityWeather'

type Props = {
  city: CityWeather;
  removeCity: (cityName: string) => void;
  setMoreInfo: (city: CityWeather) => void;
};

// CityCard component: Renders each searched city and their info 
export default function CityCard({city, removeCity, setMoreInfo}: Props) {
   return (
     <div style={{
        padding: "20px",
        border: "1px solid white",
        borderRadius: "10px"
     }}>
      <h2 id='nameText'>{city.cityName}, {city.countryName}</h2>
      <img src={`https://openweathermap.org/img/wn/${city.icon}@2x.png`} alt={city.desc} width="70px" height="70px"></img>
      <p id='tempText'>{city.temp}F</p>
      <p id='feelsLikeText'>Feels Like {city.feelsLike}F</p>
      <p id='descText'>{city.desc}</p>
      <br></br>
      <div id="cardBottom">
      <button id="moreInfoButton" onClick={() => setMoreInfo(city)}>More Info</button>
      <button id="deleteButton" onClick={() => {
        // Instead of just deleting, add popup?
        removeCity(city.cityName)
        
        }}><img src={deleteIcon}></img></button>
      </div>
     </div>
   )
}