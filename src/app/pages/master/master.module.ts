import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UiSwitchModule } from 'ngx-ui-switch';
import { ArchwizardModule } from 'angular-archwizard';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { Daterangepicker } from 'ng2-daterangepicker';
import { CKEditorModule } from "ckeditor4-angular";

import {
  NgbAlertModule,
  NgbCarouselModule,
  NgbDropdownModule,
  NgbModalModule,
  NgbProgressbarModule,
  NgbTooltipModule,
  NgbPopoverModule,
  NgbPaginationModule,
  NgbNavModule,
  NgbAccordionModule,
  NgbCollapseModule,
  NgbDatepickerModule,
  NgbModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { UIModule } from '../../layouts/shared/ui/ui.module';
import { MasterRoutingModule } from './master-routing.module';

import { PenggunaComponent } from './pengguna/pengguna.component';
import { MBarangComponent } from './m-barang/m-barang.component';
import { KategoriComponent } from './kategori/kategori.component';
import { DashboardTestComponent } from './dashboard-test/dashboard-test.component';


export const options: Partial<IConfig> = {
  thousandSeparator: '.',
};


@NgModule({
  declarations: [PenggunaComponent, MBarangComponent, KategoriComponent, DashboardTestComponent],
  imports: [
    CommonModule,
    MasterRoutingModule,
    FormsModule,
    UIModule,
    NgbAlertModule,
    NgbCarouselModule,
    NgbDropdownModule,
    NgbDatepickerModule,
    NgbModalModule,
    NgbProgressbarModule,
    NgbTooltipModule,
    NgbPopoverModule,
    NgbPaginationModule,
    NgbNavModule,
    NgbAccordionModule,
    NgSelectModule,
    UiSwitchModule,
    NgbCollapseModule,
    NgbModule,
    ReactiveFormsModule,
    ArchwizardModule,
    DataTablesModule,
    Daterangepicker,
    CKEditorModule,
    NgxMaskModule.forRoot(options)
  ]
})
export class MasterModule { }
