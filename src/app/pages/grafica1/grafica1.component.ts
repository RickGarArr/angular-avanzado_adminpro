import { Component, OnInit } from '@angular/core';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component {
  public doughnutChartLabels: Label[] = ['Ventas', 'Compras', 'Bajas'];
  public doughnutChartData: MultiDataSet = [[320, 452, 325]];
}
