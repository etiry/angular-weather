import { Component, OnDestroy } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { SelectionService } from '../services/selection.service';
import { Subscription } from 'rxjs';
import { Weather } from '../models/weather';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.css'
})
export class CurrentWeatherComponent implements OnDestroy {
  private weatherSubscription: Subscription;
  currentWeather = {} as Weather;

  constructor(private selectionService: SelectionService) {
    this.weatherSubscription = this.selectionService.currentWeather.subscribe(data => {
      this.currentWeather = data;
    });
  }

  ngOnDestroy(): void {
    if (this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
  }
}
