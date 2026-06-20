export type CityWeather = {
  cityName: string;
  stateName?: string;
  feelsLike: number;
  temp: number;
  desc: string;
  lat: number;
  lon: number;
  detailedDesc: string;
  humidity: number;
  windSpeed: number;
  icon: string;
  timezone: number;
  sunrise: number;
  sunset: number;
};