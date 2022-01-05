import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LandaService} from '../../core/services/landa.service';
import {AuthenticationService} from '../../core/services/auth.service';
import {Router} from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    submitted = false;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        public landaService: LandaService,
        private authenticationService: AuthenticationService,
        private router: Router,
    ) {
    }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
        }, {});
    }

// convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    async onSubmit() {
        this.submitted = true;

        this.landaService.DataPost('/kasir/log_in', {
            email: this.f.email.value,
            password: this.f.password.value,
            sumber: 1,
        })
            .subscribe((res: any) => {
                /**
                 * Simpan detail user ke session storage
                 */
                // tslint:disable-next-line:triple-equals
                if (res.status_code == 200) {
                    this.authenticationService
                        .setDetailUser(res.data.user)

                        .then(() => {
                            this.router.navigate(['/pages/dashboard']);
                        })
                        .catch((error) => {
                            this.error =
                                'Terjadi kesalahan pada server';
                        });
                } else {
                    this.error = res.errors[0];
                }
            });
    }
}
