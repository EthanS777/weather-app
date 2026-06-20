import './App.css'

type Props = {
    weatherDesc: string;
    weatherDetailedDesc: string;
    weatherIcon: string;
}

export default function WeatherBackground({ weatherDesc, weatherDetailedDesc, weatherIcon }: Props) {
    const getRainAmount = () => {
       let rainAmount = weatherDetailedDesc.includes("light") ? 40 : weatherDetailedDesc.includes("heavy") ? 500 : 200;
       return rainAmount;
    };

    // Clear background (day & night)
    if (weatherDesc == 'Clear') {
        return weatherIcon.includes("d") ? 
        <div className="sun-background">
            <div className="sun"></div>
        </div> : 
        <div className="moon-background">
            <div className="moon"></div>
            {Array.from({length: 100}).map((_) => (
                <div className="star"
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`
                }}></div>
            ))}
        </div>
    }
    // Cloudy background
    else if (weatherDesc == 'Clouds') {
        return <div className={weatherIcon.includes("d") ? 'cloud-day-background' : 'cloud-night-background'}>
            <div className="cloud cloud1"   style={{
    animationDelay: `-${Math.random() * 30}s`,
    animationDuration: `${20 + Math.random() * 20}s`
  }}></div>
            <div className="cloud cloud2"  style={{
    animationDelay: `-${Math.random() * 30}s`,
    animationDuration: `${20 + Math.random() * 20}s`
  }}></div>
            <div className="cloud cloud3"  style={{
    animationDelay: `-${Math.random() * 30}s`,
    animationDuration: `${20 + Math.random() * 20}s`
  }}></div>
        </div>
    }
    // Rainy background
    else if (weatherDesc == 'Rain') {
        return <div className={weatherIcon.includes("d") ? 'rain-day-background' : 'rain-night-background'}>
            {Array.from({ length: getRainAmount() }).map((_) => (
                <div className="raindrop"
                    style={{
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random()}s`,
                        animationDuration: `${0.5 + Math.random()}s`
                    }}></div>
            ))}
        </div>
    }
}