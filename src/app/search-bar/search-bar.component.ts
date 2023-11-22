import { Component, OnInit } from '@angular/core';
import { CommonModule, NgFor } from '@angular/common';
import { Observable, Subject, debounceTime, distinctUntilChanged, switchMap } from 'rxjs';
import { WeatherService } from '../services/weather.service';
import { Location } from '../location';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, NgFor],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  constructor(private weatherService: WeatherService) {}

  searchResults$!: Location[];

  onSubmit(term: string) {
    return this.weatherService.searchLocations(term)
      .subscribe((results) => {
        this.searchResults$ = results.map((result: { name: string; state: string; lat: number; lon: number; }) => ({
          name: result.name,
          state: result.state,
          lat: result.lat,
          lon: result.lon
        }))
      });
  }

}
