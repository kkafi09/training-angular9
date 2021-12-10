import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PenggunaComponent } from "./pengguna/pengguna.component";
import { MBarangComponent } from "./m-barang/m-barang.component";
import {DashboardTestComponent} from "./dashboard-test/dashboard-test.component";

const routes: Routes = [
  {
    path: 'pengguna',
    component: PenggunaComponent,

  },
  {
    path: 'barang',
    component: MBarangComponent
  },
  {
    path: 'dashboard-test',
    component : DashboardTestComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
