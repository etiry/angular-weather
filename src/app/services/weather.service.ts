import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable, catchError, map, of } from 'rxjs';
import { Location } from '../location';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient
  ) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  private API_KEY = environment.API_KEY;
  private ROOT_URL = 'https://api.openweathermap.org/';

  // get coordinates from search query
  // fetchCoordinates(query: string): Observable<Location> {
  //   return this.http.get<Location>(`${this.ROOT_URL}/geo/1.0/direct?q=${query}&appid=${this.API_KEY}`)
  //     .pipe(
  //       catchError(this.handleError<Location>('fetchCoordinates'))
  //     )
  // }

  // GET coordinates from search query
  searchLocations(query: string): Observable<any> {
    if (!query.trim()) {
      // if no search term, return empty array.
      return of([]);
    }
    return this.http.get<any[]>(`${this.ROOT_URL}/geo/1.0/direct?q=${query}&limit=5&appid=${this.API_KEY}`)
    //   .pipe(
    //     catchError(this.handleError<Location[]>('searchLocations', []))
    // );
  }

  /**
  * Handle Http operation that failed.
  * Let the app continue.
  *
  * @param operation - name of the operation that failed
  * @param result - optional value to return as the observable result
  */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console for now

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
