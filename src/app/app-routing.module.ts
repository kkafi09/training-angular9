import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './t-account/login/login.component';
import {RegisterComponent} from './t-account/register/register.component';
import {ForgotpasswordComponent} from './t-account/forgotpassword/forgotpassword.component';
import {DashboardComponent} from './t-pages/dashboard/dashboard.component';
import {ProductComponent} from './t-pages/product/product.component';
import {KasirComponent} from './t-pages/kasir/kasir.component';
import {LaporanComponent} from './t-pages/laporan/laporan.component';


const routes: Routes = [
    // { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
    // { path: '', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'forgot', component: ForgotpasswordComponent},
    {path: 'dashboard', component: DashboardComponent},
    {path: 'product', component: ProductComponent},
    {path: 'kasir', component: KasirComponent},
    {path: 'laporan', component: LaporanComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top', })],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
