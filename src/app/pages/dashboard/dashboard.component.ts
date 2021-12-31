import {Component, OnInit, ViewChild} from '@angular/core';
import {environment} from '../../../environments/environment';
import {DataTableDirective} from 'angular-datatables';
import {LandaService} from '../../core/services/landa.service';
import {ChartType} from 'chart.js';
// import {Color, Label, MultiDataSet} from 'ng2-charts';


@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],

})

export class DashboardComponent implements OnInit {
    apiURL = environment.apiURL;
    breadCrumbItems: Array<{}>;
    pageTitle: string;
    jumlahPetani: any = [];
    TambakMasuk: any = [];
    listJadwal: any;
    model: any = [];
    y: any = [];

    diagram: {
        jumlahPetani,
        TambakMasuk
    };

    dgvalue: any;
    dataDiagram: any = [];
    @ViewChild(DataTableDirective)
    dtElement: DataTableDirective;
    dtInstance: Promise<DataTables.Api>;
    dtOptions: any;
    // CHARTS 1
    // barChartLabels: Label[] = [];
    ChartDataSets: any;
    chartBarOptions: any;
    chartBarLegend: any;
    barChartType: ChartType = 'bar';
    // barChartData: MultiDataSet[] = [];
    // barChartColor: Color[] = [];
    listTahun: any[];
    luas: number;
    dataGrafik: any;
    dataTableV: any = [];


    constructor(
        private landaService: LandaService
    ) {
    }

    ngOnInit() {


        this.pageTitle = 'Dashboard';
        this.breadCrumbItems = [
            {
                label: 'Welcome To Atina',
                active: true,
            },
        ];


    }
}


