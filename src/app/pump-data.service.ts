import { Injectable } from '@angular/core';
import {Http, Response} from '@angular/http';

@Injectable()
export class PumpDataService {

  constructor(private http:Http) { }

  getPumpData(){
    this.http.get("https://ikeangular.firebaseio.com/ikeangular.json")
    .subscribe(
      (response: Response) => {
        const data: Array<any> = response.json();
        console.log(response.json());
      }
    );

    
  }
}
