import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Location } from '../models/location';
import { Weather } from '../models/weather';
import { Forecast } from '../models/forecast';

@Injectable({
  providedIn: 'root'
})
export class SelectionService {
  private weather = new BehaviorSubject<any>(null);
  private forecast = new BehaviorSubject<any>(null);
  currentWeather = this.weather.asObservable();
  currentForecast = this.forecast.asObservable();

  constructor() { }

  updateWeather(weather: Weather) {
    this.weather.next(weather);
  }

  updateForecast(forecast: Forecast) {
    this.forecast.next(forecast);
  }
}
