import { Component } from '@angular/core';
import {Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

   routeLinks:any[];
  activeLinkIndex = 0;
  constructor(private router: Router) {
    this.routeLinks = [
    {label: 'Home', link: 'home'},
    {label: 'Recharge', link: 'recharge'},
    {label: 'Dashboard', link: 'dashboard'}];

  }
}
