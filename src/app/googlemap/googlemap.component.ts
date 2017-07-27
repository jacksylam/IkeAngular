import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-googlemap',
  templateUrl: './googlemap.component.html',
  styleUrls: ['./googlemap.component.css']
})
export class GooglemapComponent implements OnInit {
lat: number = 21.3159;
  lng: number = -157.8033;

  
  constructor() { }

  ngOnInit() {
  }

}
