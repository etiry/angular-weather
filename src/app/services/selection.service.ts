import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Location } from '../models/location';
import { Weather } from '../models/weather';
import { Forecast } from '../models/forecast';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private location = new BehaviorSubject<any>(null);
  private weather = new BehaviorSubject<any>(null);
  private forecast = new BehaviorSubject<any>(null);
  currentLocation = this.location.asObservable();
  currentWeather = this.weather.asObservable();
  currentForecast = this.forecast.asObservable();

  constructor() { }

  updateLocation(location: Location) {
    this.location.next(location);
  }

  updateWeather(weather: Weather) {
    this.weather.next(weather);
  }

  updateForecast(forecast: Forecast) {
    this.forecast.next(forecast);
  }
}
