import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { City } from '../../models/city';
import { Forecast } from '../../models/forecast';
import { CityService } from '../../services/city.service';
import { WeatherService } from '../../services/weather.service';
import { ImageService } from '../../services/image.service';

import { AboutPage } from '../about/about';

import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private cityService: CityService,
    private weatherService: WeatherService,
    private imageService: ImageService,
    private menu: MenuController) {
    menu.enable(true);
  }

  city: City;
  currentWeather: any;
  hours: any[];
  cityName: string;
  errorMsg: any;
  searchQuery: string = '';
  cityPic: string;

  ngOnInit() {
    this.getWeather('Kiev');
  }

  getItems(ev: any) {
    if (!ev.target.value) {
      this.cityName = 'Kiev';
    }
    this.getWeather(this.cityName);
  }

  ngOnDestroy() {

  }

  getWeather(cityName: any) {
    this.cityService.getCityFromGMapsByName(cityName)
      // So flatMap acts kind of like subscribe,
      // but it provides for chaining Observables
      .flatMap(city => {
        this.city = city;
        return this.weatherService.getWeather(city.lat, city.lon);
      })
      .flatMap(forecast => {
        this.currentWeather = forecast.currently;
        this.hours = forecast.hourly;
        return this.imageService.getImages(this.cityName);
      })
      .subscribe(images => {
        this.cityPic = images.items[Math.floor(Math.random() * images.items.length)].link;
      });
  }
}
