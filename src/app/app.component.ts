import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, NavController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { AboutPage } from '../pages/about/about';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('content') nav: NavController
  rootPage:any = HomePage;
  aboutPage:any = AboutPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, menu: MenuController) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      menu.enable(true);
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    // Don't push page if we've already done this
    if (page.name != this.nav.getActive().name)
      this.nav.push(page);
  }

}

