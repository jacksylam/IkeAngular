
//our root app component
import {Component, Input} from '@angular/core';
// import {single, multi} from '../data';

@Component({
  selector: 'app-ngx-test',
  templateUrl: './ngx-test.component.html',
  styleUrls: ['./ngx-test.component.css']
})
export class NgxTestComponent {
  // single: any[];
  // multi: any[];

  @Input() private data: Array<any>;

  view: any[] = [700, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Day';
  showYAxisLabel = true;
  yAxisLabel = 'Qi';


  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;
  
  constructor() {
    // Object.assign(this, {})   
  }
  
  onSelect(event) {
    console.log(event);
  }
  
}



