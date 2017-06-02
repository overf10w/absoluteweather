import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';

import { City } from '../../models/city';
import { CityService } from '../../services/city.service';
import { WeatherService } from '../../services/weather.service';

import { AboutPage } from '../about/about';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private cityService: CityService,
    private weatherService: WeatherService,
    private menu: MenuController) {
    menu.enable(true);
  }

  city: City;
  currentWeather: any;
  hours: any[];
  cityName: string;
  errorMsg: any;
  searchQuery: string = '';

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

  goToOtherPage() {
    this.navCtrl.push(AboutPage);
  }

  getWeather(cityName: any) {
    this.cityName = cityName;
    this.cityService.getCityFromGMapsByName(cityName)
      .subscribe(city => {
        this.city = city;
        this.weatherService.getWeather(city.lat, city.lon)
          .subscribe(forecast => {
            this.currentWeather = forecast.currently;
            this.hours = forecast.hourly;
          });
      });
  }
}
