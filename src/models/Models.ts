export interface IPlaces {
  administrativeDivision: string;
  code: string;
  countryCode: string;
  name: string;
}

export interface IForecast {
  forecastCreationTimeUtc: string;
  forecastTimestamps: IForecastForecastTimestamps[];
  forecastType: string;
  place: IForecastPlace;
}

export interface IForecastForecastTimestamps {
  airTemperature: number;
  cloudCover: number;
  conditionCode: string;
  forecastTimeUtc: string;
  relativeHumidity: number;
  seaLevelPressure: number;
  totalPrecipitation: number;
  windDirection: number;
  windGust: number;
  windSpeed: number;
  location: string;
}

interface IForecastPlace {
  administrativeDivision: string;
  code: string;
  coordinates: IForecastPlaceCoordinates;
  country: string;
  countryCode: string;
  name: string;
}

interface IForecastPlaceCoordinates {
  latitude: number;
  longitude: number;
}
