import { Component } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { WeatherService } from '../services/weather.service';
import { Location } from '../location';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, NgFor, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
[x: string]: any;
  constructor(private weatherService: WeatherService) {}

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

}
