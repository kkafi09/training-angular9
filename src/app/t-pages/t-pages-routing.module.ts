import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {ProductComponent} from './product/product.component';
import {KasirComponent} from './kasir/kasir.component';
import {TransaksiComponent} from './transaksi/transaksi.component';
import {LaporanComponent} from './laporan/laporan.component';


const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
        children : [
            {
                path: 'dashboard',
                component: DashboardComponent
            }
        ]
    },
    {
        path: '',
        component: ProductComponent,
        children : [
            {
                path: 'product',
                component: ProductComponent
            }
        ]
    },
    {
        path: '',
        component: KasirComponent,
        children : [
            {
                path: 'kasir',
                component: KasirComponent
            }
        ]
    },
    {
        path: '',
        component: TransaksiComponent,
        children : [
            {
                path: 'transaksi',
                component: TransaksiComponent
            }
        ]
    },
    {
        path: '',
        component: LaporanComponent,
        children : [
            {
                path: 'laporan',
                component: LaporanComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TPagesRoutingModule {
}
