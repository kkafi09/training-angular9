import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TAccountRoutingModule } from './t-account-routing.module';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [LoginComponent, RegisterComponent, ForgotpasswordComponent],
    imports: [
        CommonModule,
        TAccountRoutingModule,
        NgbAlertModule,
        ReactiveFormsModule,
    ]
})
export class TAccountModule { }
