import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TPagesRoutingModule } from './t-pages-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';
import { KasirComponent } from './kasir/kasir.component';
import { TransaksiComponent } from './transaksi/transaksi.component';
import { LaporanComponent } from './laporan/laporan.component';


@NgModule({
  declarations: [DashboardComponent, ProductComponent, KasirComponent, TransaksiComponent, LaporanComponent],
  imports: [
    CommonModule,
    TPagesRoutingModule
  ]
})
export class TPagesModule { }
