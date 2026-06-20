import deleteIcon from './assets/deleteIcon.png'
import './App.css'
import type {CityWeather} from './types/CityWeather'
import { useNavigate } from 'react-router-dom'

type Props = {
  city: CityWeather;
  removeCity: (lat: number, lon: number) => void;
  setMoreInfo: (city: CityWeather) => void;
  darkMode: boolean;
};

// CityCard component: Renders each searched city and their info 
export default function CityCard({city, removeCity, setMoreInfo, darkMode}: Props) {
   const navigate = useNavigate();
   return (
     <div style={{
        padding: "20px",
        border: `${darkMode ? "1px solid white" : "1px solid black"}`,
        borderRadius: "10px"
     }}>
      <h2 id='nameText'>{city.cityName}, {city.stateName}</h2>
      <img src={`https://openweathermap.org/img/wn/${city.icon}@2x.png`} alt={city.desc} width="70px" height="70px"></img>
      <div style={{color: `${darkMode ? 'lightblue' : 'darkblue'}`}}>
      <p>{city.temp}F</p>
      <p>Feels Like {city.feelsLike}F</p>
      <p id='descText'>{city.desc}</p>
      </div>
      <br></br>
      <div id="cardBottom">
      <button id="moreInfoButton" 
      style={{border: `${darkMode ? '2px solid whitesmoke' : '2px solid black'}`}} 
      onClick={() => { 
        setMoreInfo(city);
        navigate("/details");
      }}>More Info</button>
      <button id="deleteButton" 
      style={{border: `${darkMode ? '2px solid whitesmoke' : '2px solid black'}`}} 
      onClick={() => {
        // Instead of just deleting, add popup?
        removeCity(city.lat, city.lon)
        
        }}><img src={deleteIcon}></img></button>
      </div>
     </div>
   )
}