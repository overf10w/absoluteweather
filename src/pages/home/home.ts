import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { City } from '../../models/city';
import { CityService } from '../../services/city.service';
import { WeatherService } from '../../services/weather.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, 
              private cityService: CityService, 
              private weatherService: WeatherService) { }

  city: City;
  currentWeather: any;
  hours: any[];
  cityName: string;
  sub: any;
  errorMsg: any;

  ngOnInit() {
    this.cityName = 'Kiev';
    this.weatherService.getWeather(50.450100, 30.523)
        .subscribe(forecast => {
          console.log(forecast);
          this.currentWeather = forecast.currently;
          this.hours = forecast.hourly;
        });
    
    // this.sub = this.route.params.subscribe(params => {
    //   this.cityName = params['name'];
    //   // this.city = this.cityService.getCityByName(this.cityName);
    //   this.cityService.getCityFromGMapsByName(this.cityName)
    //     .subscribe(city => {
    //       this.city = city;
    //     })

    //   // setTimeout --> so this.city won't be undefined
    //   setTimeout(() => {
    //     this.weatherService.getWeather(this.city.lat, this.city.lon)
    //       .subscribe(forecast => {
    //         this.currentWeather = forecast.currently;
    //         this.hours = forecast.hourly;
    //       }, err => this.errorMsg = <any>err);
    //   }, 300);
    // });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
