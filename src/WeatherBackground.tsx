import './App.css'

type Props = {
    weather: string;
}

export default function WeatherBackground({weather}: Props) {
        if (weather == 'Clear') {
           return <div className="sun-background"></div>
        }
        else if (weather == 'Clouds') {
            return <div className="cloud-background"></div>
        }
        else if (weather == 'Rain') {
            return <div className="rain-background"></div>
        }
}