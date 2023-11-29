import { Component, OnDestroy } from '@angular/core';
import { CommonModule, NgIf, NgFor } from '@angular/common';
import { SelectionService } from '../services/selection.service';
import { Subscription } from 'rxjs';
import { Forecast } from '../models/forecast';

@Component({
  selector: 'app-forecast',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './forecast.component.html',
  styleUrl: './forecast.component.css'
})
export class ForecastComponent implements OnDestroy {
  private forecastSubscription: Subscription;
  currentForecast = {} as Forecast;

  constructor(private selectionService: SelectionService) {
    this.forecastSubscription = this.selectionService.currentForecast.subscribe(data => {
      this.currentForecast = data;
    });
  }

  ngOnDestroy(): void {
    if (this.forecastSubscription) {
      this.forecastSubscription.unsubscribe();
    }
  }
}
