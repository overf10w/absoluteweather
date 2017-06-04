import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { Forecast } from '../models/forecast';

@Injectable()
export class WeatherService {
  
  constructor(private http: Http) { }

  getWeather(latitude: number, longitude: number): Observable<Forecast> {
    let url = 'https://api.darksky.net/forecast/3bfcfdfa160eee3357357a6c3c400e6d/' +
              latitude.toString() + 
              ',' + 
              longitude.toString() + 
              '?units=ca';

    return this.http.get(url)
      .map((res) => this.extractData(res))  // TODO pay attention to THIS!
      .catch(this.handleError);
  }

  private extractData(res: Response): Forecast {
    console.log(res.json());
    let forecast = new Forecast();
    forecast.currently = res.json().currently;
    forecast.hourly = this.makeHours(res.json().hourly.data);
    return forecast;
  }

  private makeHours(hourly) {
    let hours = new Array;
    for (let i = 0; i < hourly.length; i++) {
      let hour = hourly[i];
      hour.time *= 1000;
      hour.windBearing = this.degToCompass(hour.windBearing);
      hours.push(hour);
    }
    return hours;
  }

  private degToCompass(num) {
    let val = Math.floor((num / 22.5) + 0.5);
    let arr = [
      "North",
      "North-Northeast",
      "Northeast",
      "East-Northeast",
      "East",
      "East-Southeast",
      "Southeast",
      "South-Southeast",
      "South",
      "South-Southwest",
      "Southwest",
      "West-Southwest",
      "West",
      "West-Northwest",
      "Northwest",
      "North-Northwest"
    ];
    return arr[(val % 16)];
  }

  private handleError(error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}
