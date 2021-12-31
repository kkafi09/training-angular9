import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DashboardLayoutComponent} from './t-layouts/dashboard-layout/dashboard-layout.component';
import {AuthLayoutComponent} from './t-layouts/auth-layout/auth-layout.component';


const routes: Routes = [
    // { path: 'account', loadChildren: () => import('./account/account.module').then(m => m.AccountModule) },
    // { path: '', component: LayoutComponent, loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
    // Auth routes
    {
        path: '',
        component: AuthLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'auth',
                pathMatch: 'full'
            },
            {
                path: 'auth',
                loadChildren: () => import('./t-account/t-account.module').then(m => m.TAccountModule)
            }
        ]
    },
    // App routes
    {
        path: '',
        component: DashboardLayoutComponent,
        children: [
            {
                path: '',
                redirectTo: 'pages',
                pathMatch: 'full'
            },
            {
                path: 'pages',
                loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule)
            }
        ]
    },
    // {path: 'cetak-laporan', component: CetakLaporanComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'top', })],
    exports: [RouterModule]
})

export class AppRoutingModule {
}
