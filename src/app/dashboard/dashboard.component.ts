
import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { DayData } from '../day-data';
import * as bootstrapSlider from 'bootstrap-slider';
import * as d3 from 'd3';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnChanges {
  

  private chartData: Array<any>;

  @Input() private Xi: number;
  @Input() private Ei: number;
  @Input() private Mm: number;
  @Input() private DR: number;
  @Input() private slider: any;
  //  private Qi: number;
  //   private Mi: number;
  private DayValues: Array<DayData>;

  constructor() {
    this.DayValues = [];
    this.Xi = 10;
    this.Ei = 10;
    this.Mm = 10;
    this.DR = 10;

 this.slider =  new bootstrapSlider.Slider('#ex1', {
	formatter: function(value) {
		return 'Current value: ' + value;
	}
});


    
  }

  ngOnInit() {
 
    this.calculateMonthData();

    this.generateData();
    // give everything a chance to get loaded before starting the animation to reduce choppiness
    // setTimeout(() => {


    //   // change the data periodically
    //   setInterval(() => this.generateData(), 3000);
    // }, 1000);

  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("There's a change");
    this.calculateMonthData();
    this.generateData();
  }

  ngAfterViewchecked() {

  }

  ngDoCheck() {
    if (this.Xi != this.DayValues[0].Xi) {
      this.calculateMonthData();
      this.generateData();
    }
    if (this.Ei != this.DayValues[0].Ei) {
      this.calculateMonthData();
      this.generateData();
    }
    if (this.Mm != this.DayValues[0].Mm) {
      this.calculateMonthData();
      this.generateData();
    }
    if (this.DR != this.DayValues[0].DR) {
      this.calculateMonthData();
      this.generateData();
    }
  }

  isMostureStorageGreater(Xi, Ei, Mm, Dr): boolean {
    if ((Xi - Ei) <= Mm) {
      return true;

    }
    else {
      return false;
    }
  }

  calculateQi(Xi, Ei, Mm, DR): number {
    if (this.isMostureStorageGreater(Xi, Ei, Mm, DR)) {
      return DR
    }
    else {
      return Xi - Ei - Mm + parseFloat(DR);
    }
  }

  calculateMi(Xi, Ei, Mm, DR): number {
    if (this.isMostureStorageGreater(Xi, Ei, Mm, DR)) {
      return Xi - Ei;
    }
    else {
      return Mm;
    }
  }

  calculateDay(Xi, Ei, Mm, DR): DayData {
    var Qi;
    var Mi;

    Qi = this.calculateQi(Xi, Ei, Mm, DR);
    Mi = this.calculateMi(Xi, Ei, Mm, DR);

    var day = new DayData(Xi, Ei, Mm, DR, Qi, Mi);
    return day;
  }

  calculateMonthData(): void {
    this.DayValues = [];
    var tempDay = this.calculateDay(this.Xi, this.Ei, this.Mm, this.DR);
    this.DayValues.push(tempDay);

    for (let i = 1; i < 31; i++) {
      tempDay = this.calculateDay(this.DayValues[i - 1].Xi, this.DayValues[i - 1].Ei, this.DayValues[i - 1].Mm, this.DayValues[i - 1].DR);
      this.DayValues.push(tempDay);
    }

  }

  generateData() {
    this.chartData = [];

    var thing = {
      name: "Qi1",
      series: []
    }

    for (let i = 0; i < this.DayValues.length; i++) {
      thing.series.push({ name: i, value: this.DayValues[i].Qi + Math.random() * 10 });
    }

    this.chartData.push(thing);

    var thing2 = {
      name: "Qi2",
      series: []
    }

      for (let i = 0; i < this.DayValues.length; i++) {
      thing2.series.push({ name: i, value: this.DayValues[i].Qi + Math.random() * 10 });
    }
        this.chartData.push(thing2);


  }

  

    
}
