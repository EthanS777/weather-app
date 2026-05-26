import deleteIcon from './assets/deleteIcon.png'
import './App.css'

type Props = {
  cityName: string;
  temp: number;
  desc: string;
  removeCity: (cityName: string) => void;
};

// CityCard component: Renders each city and their info 
export default function CityCard({cityName, temp, desc, removeCity}: Props) {
   return (
     <div style={{
        padding: "20px",
        border: "1px solid white",
        borderRadius: "10px"
     }}>
      <h2 id='nameText'>{cityName}</h2>
      <p id='tempText'>{temp}F</p>
      <p id='descText'>{desc}</p>
      <br></br>
      <button id="deleteButton" onClick={() => removeCity(cityName)}><img src={deleteIcon}></img></button>
     </div>
   )
}