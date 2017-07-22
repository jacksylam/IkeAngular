import * as d3 from 'd3';

//our root app component
import {Component, Input, ViewEncapsulation} from '@angular/core';

 import {single, multi, test} from '../data';

@Component({
  selector: 'app-ngx-test',
  templateUrl: './ngx-test.component.html',
  styleUrls: ['./ngx-test.component.css'],
    encapsulation: ViewEncapsulation.Emulated,

})
export class NgxTestComponent {
   single: any[];
   multi: any[];

  @Input() private data: Array<any>;
  @Input() private xAxisLabel: String;
  @Input() private yAxisLabel: String;

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  // xAxisLabel = 'Day';
  showYAxisLabel = true;
  // yAxisLabel = 'Qi';
   autoScale = true;

 curve = d3.curveMonotoneX;

 axisFormat(val) {
  return  val.toLocaleString(); 
}


  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };


  
  constructor() {
     Object.assign(this, {single, multi, test})   
  }
  
  onSelect(event) {
    console.log(event);
  }
  
}



