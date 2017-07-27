import { Component, OnInit } from '@angular/core';
import { AgmMap, AgmDataLayer } from '@agm/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.component.html',
  styleUrls: ['./googlemap.component.css'],
})
export class GooglemapComponent implements OnInit {
  lat: number = 21.2998;
  lng: number = -157.8176;

  results: string[];
 
  // geojson: Object = "https://storage.googleapis.com/mapsdevsite/json/google.json";
  
  
     obj: object;
     obj2: object;
   
  constructor(private http : Http) { 
 

  }

  ngOnInit() {
             this.getJSON().subscribe(data => this.obj=data, error => console.log(error));
             this.getJSON2().subscribe(data => this.obj2=data, error => console.log(error));

  }

   public getJSON(): Observable<any> {
         return this.http.get("../../assets/aquifer.geojson")
                         .map((res:any) => res.json())

     }

        public getJSON2(): Observable<any> {
         return this.http.get("../../assets/wellNew.geojson")
                         .map((res:any) => res.json())

     }
  
}
