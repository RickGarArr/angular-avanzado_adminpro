import { Component, Input } from '@angular/core';
import { Color, Label, MultiDataSet } from 'ng2-charts';

@Component({
    selector: 'app-grafica',
    templateUrl: './grafica.component.html',
})
export class GraficaComponent {
    @Input() title = 'Sin titulo';
    @Input('labels') doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
    @Input('data') doughnutChartData: MultiDataSet = [[350, 450, 100]];
    
    public colors: Color[] = [
        { backgroundColor: ['#9E120E', '#FF5800', '#FFB414'] }
    ];
}