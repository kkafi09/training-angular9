import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ForgotpasswordComponent} from './forgotpassword/forgotpassword.component';


const routes: Routes = [
    {
        path: '',
        component: LoginComponent,
        children: [
            {
                path: 'auth',
                component: LoginComponent
            }
        ]
    },
    {
        path: '',
        component: RegisterComponent,
        children: [
            {
                path: 'register',
                component: RegisterComponent
            }
        ]
    },
    {
        path: '',
        component: ForgotpasswordComponent,
        children: [
            {
                path: 'forgot',
                component: ForgotpasswordComponent
            }
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TAccountRoutingModule {
}
