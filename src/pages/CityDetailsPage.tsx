import CityDetails from '../CityDetails'
import type { CityWeather } from '../types/CityWeather'
import WeatherBackground from '../WeatherBackground'
import { useNavigate } from 'react-router-dom';
import '../App.css'

type Props = {
    selectedCity: CityWeather | null;
    setSelectedCity: (
        city: CityWeather | null
    ) => void;
}

export default function CityDetailsPage({ selectedCity, setSelectedCity}: Props) {
    const navigate = useNavigate();
    if (!selectedCity) {
        return <h1>No City Selected</h1>;
    }

    console.log(selectedCity)
    return (
    <>
        <WeatherBackground
          weatherDesc={selectedCity.desc}
          weatherDetailedDesc={selectedCity.detailedDesc}
          weatherIcon={selectedCity.icon}
          />

        <CityDetails 
        city={selectedCity} 
        goBack={() => {
            setSelectedCity(null)
            navigate("/cities")
        }}
        />
    </>
    )
}