import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';


@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  constructor(
    public navCtrl: NavController,
    private menu: MenuController) {
    menu.enable(true);
  }

  ngOnInit() {
    
  }


  ngOnDestroy() {

  }
}
