import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { WeatherService } from '../services/weather.service';
import { SelectionService } from '../services/selection.service';
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

  onSubmit(term: string, form: NgForm) {
    form.reset();
    return this.weatherService.searchLocations(term)
      .subscribe((results) => {
        this.searchResults = results.map((result: Location) => ({
          name: result.name,
          state: result.state,
          lat: result.lat,
          lon: result.lon
        }))
      });
  }

  onSelect(option: Location) {
    return this.weatherService.getWeather(option)
      .subscribe((results) => {
        const weather = {
          location: option,
          temp: Math.round(results.main.temp),
          description: results.weather[0].description,
          icon: results.weather[0].icon
        };
        // const forecast = {
        //   location: option,
        //   days: results.daily.map((day: any) => (
        //     {
        //       temp: {
        //         min: day.temp.min,
        //         max: day.temp.max
        //       },
        //       description: day.weather.description,
        //       icon: day.weather.icon
        //     }
        //   ))
        // }
        this.selectionService.updateWeather(weather);
        // this.selectionService.updateForecast(forecast)
      })
  }

}
