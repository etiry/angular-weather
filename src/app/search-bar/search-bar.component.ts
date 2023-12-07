import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { forkJoin } from 'rxjs';
import { WeatherService } from '../services/weather.service';
import { SelectionService } from '../services/selection.service';
import { ModuleUtil } from '../module.util';
import { Location } from '../models/location';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  constructor(
    private weatherService: WeatherService,
    private selectionService: SelectionService
  ) {}

  search = '';

  searchResults!: Location[];

  onSubmit(term: string) {
    return this.weatherService.searchLocations(term)
      .subscribe((results) => {
        this.searchResults = results.map((result: any) => ({
          name: result.name,
          state: result.state,
          lat: result.lat,
          lon: result.lon
        }))
      });
  }

  onSelect(option: Location, form: NgForm) {
    form.reset();

    this.searchResults = [];
    this.selectionService.updateLocation(option);
    
    const getWeatherResponse = this.weatherService.getWeather(option);
    const getForecastResponse = this.weatherService.getForecast(option);
    
    return forkJoin([getWeatherResponse, getForecastResponse])
      .subscribe((results) => {
        const weather = ModuleUtil.setWeather(option, results[0]);
        const forecast = ModuleUtil.setForecast(option, results[1]);
        this.selectionService.updateWeather(weather);
        this.selectionService.updateForecast(forecast)
      })
  }

}
