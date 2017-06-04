import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { City } from '../models/city';

@Injectable()
export class CityService {
  constructor(private http: Http) { }

  getCityFromGMapsByName(name) {
    let city = new City();
    return this.http
      .get('https://maps.googleapis.com/maps/api/geocode/json?address=' + 
           name + 
           '&key=AIzaSyBe-8yB-U_MuVPDZqMh-knhiQdF-qBLpOA')
      .map(this.extractData);
  }

  private extractData(res: Response): City {
    let city = new City();
    city.lat = res.json().results[0].geometry.location.lat;
    city.lon = res.json().results[0].geometry.location.lng;
    city.name = res.json().results[0].formatted_address;
    return city;
  }

}
