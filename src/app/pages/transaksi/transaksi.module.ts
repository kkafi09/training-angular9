import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransaksiRoutingModule } from './transaksi-routing.module';
import { PenjualanComponent } from './penjualan/penjualan.component';


@NgModule({
  declarations: [PenjualanComponent],
  imports: [
    CommonModule,
    TransaksiRoutingModule
  ]
})
export class TransaksiModule { }
