
import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { DayData } from '../day-data';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ObservableMedia } from '@angular/flex-layout';

import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';




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
  private FakeMonth: Array<any>;

  public cols: Observable<number>;

  private xAxisLabel: string;
  private yAxisLabel: string;

  private FakeMonths: Array<any>;

  @Input() private DR2: number = 2;
  private DayValues2: Array<DayData>;
  private chartData2: Array<any>;
  @Input() private DR3: number = 3;
  @Input() private DR4: number =4;
  @Input() private DR5: number = 5;

    private DayValues3: Array<DayData>;
  private chartData3: Array<any>;
    private DayValues4: Array<DayData>;
  private chartData4: Array<any>;
    private DayValues5: Array<DayData>;
  private chartData5: Array<any>;

  private oximinJsonData: Array<any>;
  private oximinChartData: Array<any>;

  constructor(private http: Http) {
    this.DayValues = [];
    this.Xi = 10;
    this.Ei = 10;
    this.Mm = 10;
    this.DR = 10;
    this.xAxisLabel = "Day";
    this.yAxisLabel = "Liters";

    this.FakeMonth = [];
    for (let i = 0; i < 31; i++) {
      this.FakeMonth.push({
        Xi: Math.random() * 100,
        Ei: Math.random() * 100,
        Mm: Math.random() * 100
      })
    }

    this.DayValues2 = [];


    this.generateFakeMonths();


    

  }

  ngOnInit() {

    this.calculateMonthData();

    this.generateData();

    this.calculateMonthData2();
    this.generateData2();



    this.calculateMonthData3();
    this.generateData3();
      this.calculateMonthData4();
    this.generateData4();
      this.calculateMonthData5();
    this.generateData5();
    
  // this.getJSON().subscribe(data => this.oximinJsonData = data, error => console.log(error));
  // this.generateOximinChartData();
  this.getJSON().subscribe( data => this.generateOximinChartData(data), error => console.log(error));
  // this.generateOximinChartData();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("There's a change");
    this.calculateMonthData();
    this.generateData();
  }

  ngAfterViewchecked() {

  }

  ngDoCheck() {
    if (this.DR != this.DayValues[0].DR) {
      this.calculateMonthData();
      this.generateData();
    }

    if(this.DR2 != this.DayValues2[0].DR){
      this.calculateMonthData2();
      this.generateData2();
    }


        if(this.DR3 != this.DayValues3[0].DR){
      this.calculateMonthData3();
      this.generateData3();
    }

        if(this.DR4 != this.DayValues4[0].DR){
      this.calculateMonthData4();
      this.generateData4();
    }

        if(this.DR5 != this.DayValues5[0].DR){
      this.calculateMonthData5();
      this.generateData5();
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

    var tempDay;
    for (let i = 0; i < 31; i++) {
      tempDay = this.calculateDay(this.FakeMonth[i].Xi, this.FakeMonth[i].Ei, this.FakeMonth[i].Mm, this.DR);
      this.DayValues.push(tempDay);
    }

  }

  generateData() {
    this.chartData = [];

    var thing = {
      name: "Ground Water Recharge During Day",
      series: []
    }

    for (let i = 0; i < 31; i++) {
      thing.series.push({ name: (i + 1).toString(), value: this.DayValues[i].Qi });
    }

    this.chartData.push(thing);

    var thing2 = {
      name: "Moisture Storage at the End of the Current Day",
      series: []
    }

    for (let i = 0; i < this.DayValues.length; i++) {
      thing2.series.push({ name: (i + 1).toString(), value: this.DayValues[i].Mi });
    }
    this.chartData.push(thing2);
  }




  // ALL HARD CODED STUFF HERE
   calculateMonthData2(): void {
    this.DayValues2 = [];

    var tempDay;
    for (let i = 0; i < 31; i++) {
      tempDay = this.calculateDay(this.FakeMonths[0][i].Xi, this.FakeMonths[0][i].Ei, this.FakeMonths[0][i].Mm, this.DR2);
      this.DayValues2.push(tempDay);
    }

  }

    generateData2() {
    this.chartData2 = [];

    var thing = {
      name: "Ground Water Recharge During Day",
      series: []
    }

    for (let i = 0; i < 31; i++) {
      thing.series.push({ name: (i + 1).toString(), value: this.DayValues2[i].Qi });
    }

    this.chartData2.push(thing);

    var thing2 = {
      name: "Moisture Storage at the End of the Current Day",
      series: []
    }

    for (let i = 0; i < this.DayValues2.length; i++) {
      thing2.series.push({ name: (i + 1).toString(), value: this.DayValues2[i].Mi });
    }
    this.chartData2.push(thing2);
  }



   calculateMonthData3(): void {
    this.DayValues3 = [];

    var tempDay;
    for (let i = 0; i < 31; i++) {
      tempDay = this.calculateDay(this.FakeMonths[1][i].Xi, this.FakeMonths[1][i].Ei, this.FakeMonths[1][i].Mm, this.DR3);
      this.DayValues3.push(tempDay);
    }

  }

    generateData3() {
    this.chartData3 = [];

    var thing = {
      name: "Ground Water Recharge During Day",
      series: []
    }

    for (let i = 0; i < 31; i++) {
      thing.series.push({ name: (i + 1).toString(), value: this.DayValues3[i].Qi });
    }

    this.chartData3.push(thing);

    var thing2 = {
      name: "Moisture Storage at the End of the Current Day",
      series: []
    }

    for (let i = 0; i < this.DayValues3.length; i++) {
      thing2.series.push({ name: (i + 1).toString(), value: this.DayValues3[i].Mi });
    }
    this.chartData3.push(thing2);
  }



   calculateMonthData4(): void {
    this.DayValues4 = [];

    var tempDay;
    for (let i = 0; i < 31; i++) {
      tempDay = this.calculateDay(this.FakeMonths[2][i].Xi, this.FakeMonths[2][i].Ei, this.FakeMonths[2][i].Mm, this.DR4);
      this.DayValues4.push(tempDay);
    }

  }

    generateData4() {
    this.chartData4 = [];

    var thing = {
      name: "Ground Water Recharge During Day",
      series: []
    }

    for (let i = 0; i < 31; i++) {
      thing.series.push({ name: (i + 1).toString(), value: this.DayValues4[i].Qi });
    }

    this.chartData4.push(thing);

    var thing2 = {
      name: "Moisture Storage at the End of the Current Day",
      series: []
    }

    for (let i = 0; i < this.DayValues4.length; i++) {
      thing2.series.push({ name: (i + 1).toString(), value: this.DayValues4[i].Mi });
    }
    this.chartData4.push(thing2);
  }


   calculateMonthData5(): void {
    this.DayValues5 = [];

    var tempDay;
    for (let i = 0; i < 31; i++) {
      tempDay = this.calculateDay(this.FakeMonths[3][i].Xi, this.FakeMonths[3][i].Ei, this.FakeMonths[3][i].Mm, this.DR5);
      this.DayValues5.push(tempDay);
    }

  }

    generateData5() {
    this.chartData5 = [];

    

    var thing = {
      name: "Ground Water Recharge During Day",
      series: []
    }

    for (let i = 0; i < 31; i++) {
      thing.series.push({ name: (i + 1).toString(), value: this.DayValues5[i].Qi });
    }

    this.chartData5.push(thing);

    var thing2 = {
      name: "Moisture Storage at the End of the Current Day",
      series: []
    }

    for (let i = 0; i < this.DayValues5.length; i++) {
      thing2.series.push({ name: (i + 1).toString(), value: this.DayValues5[i].Mi });
    }
    this.chartData5.push(thing2);
  }



  generateFakeMonths() {
    this.FakeMonths = [];

    for (let j = 0; j < 20; j++) {


      var fakeMonth = [];
      for (let i = 0; i < 31; i++) {

        fakeMonth.push({
          Xi: Math.random() * 100,
          Ei: Math.random() * 100,
          Mm: Math.random() * 100
        })
      } this.FakeMonths.push(fakeMonth);

    }

  }


  generateOximinChartData(data){
    this.oximinJsonData = data;
    this.oximinChartData = [];

      var halawaShaft = {
        name: "Halawa Shaft",
        series: []
      }


      var kalauaoWells = {
        name:"Kalauao Wells",
        series: []
      }
      
      var pearlCity = {
        name: "Pearl City III",
        series: []
      }

      var kunia = {
        name: "Kunia",
        series:[]
      }

      for(let i = 0; i < this.oximinJsonData.length; i++){
        halawaShaft.series.push({name: (i+1).toString(), value: this.oximinJsonData[i]['Halawa Shaft']});
        kalauaoWells.series.push({name: (i+1).toString(), value: this.oximinJsonData[i]['Kalauao Wells']});
        pearlCity.series.push({name: (i+1).toString(), value: this.oximinJsonData[i]['Pearl City III']});
        kunia.series.push({name: (i+1).toString(), value: this.oximinJsonData[i]['Kunia III']});
      }

      this.oximinChartData.push(halawaShaft);
      this.oximinChartData.push(kalauaoWells);
      this.oximinChartData.push(pearlCity);
      this.oximinChartData.push(kunia);

      console.log(this.oximinChartData);

  }

 public getJSON(): Observable<any> {
    return this.http.get("../../assets/Oximin.json")
      .map((res: any) => res.json())

  }



}
