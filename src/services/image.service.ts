import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { City } from '../models/city';

@Injectable()
export class ImageService {
  key: string = 'AIzaSyDtavNGndHwNa_GJzF3avYJva0acC_P2cc';
  cx: string = '017718447423858031355:wafv34o22ag';

  constructor(private http: Http) { }
  getImages(name) {
    if (!name) {
      name = 'Kiev';
    }
    return this.http
      .get('https://www.googleapis.com/customsearch/v1?q=' +
            name + '&key=' + this.key + '&cx=' + this.cx + 
            '&searchType=image')
      .map(res => res = res.json());
  }
}
