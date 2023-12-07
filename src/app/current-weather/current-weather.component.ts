import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { WeatherService } from '../services/weather.service';
import { SelectionService } from '../services/selection.service';
import { Observable, Subscription, forkJoin, map, timer } from 'rxjs';
import { Location } from '../models/location';
import { Weather } from '../models/weather';
import { ModuleUtil } from '../module.util';

@Component({
  selector: 'app-current-weather',
  standalone: true,
  imports: [CommonModule, NgIf],
  templateUrl: './current-weather.component.html',
  styleUrl: './current-weather.component.css'
})
export class CurrentWeatherComponent implements OnDestroy, OnInit {
  private weatherSubscription: Subscription = new Subscription;
  currentLocation = {} as Location;
  currentWeather = {} as Weather;
  everyTenMinutes: Observable<number> = timer(0, 600000);

  constructor(
    private weatherService: WeatherService, 
    private selectionService: SelectionService
  ) { }

  ngOnInit(): void {
    this.selectionService.currentWeather.subscribe(data => {
      this.currentWeather = data;
    })

    this.weatherSubscription = this.everyTenMinutes
    .pipe(map(() => {
      if (this.isEmptyObject(this.currentWeather) === false) {
        this.refreshData();
      }})
    )
    .subscribe()
  }

  refreshData() {
    this.selectionService.currentLocation.subscribe(data => {
      this.currentLocation = data;
    });

    const getWeatherResponse = this.weatherService.getWeather(this.currentLocation);

    getWeatherResponse.subscribe((results) => {
      const weather = ModuleUtil.setWeather(this.currentLocation, results);
      this.selectionService.updateWeather(weather);
      this.currentWeather = weather;
    })
  }

  isEmptyObject(obj: any) {
    return (obj && (Object.keys(obj).length === 0));
  }

  ngOnDestroy(): void {
    if (this.weatherSubscription) {
      this.weatherSubscription.unsubscribe();
    }
  }
}
