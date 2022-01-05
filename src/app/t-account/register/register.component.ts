import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../core/services/auth.service';
import {MustMatch} from '../../account/auth/signup/_helpers/must-match_validator';
import {LandaService} from '../../core/services/landa.service';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {


    signupForm: FormGroup;
    submitted = false;
    error = '';
    successmsg = false;

    // set the currenr year
    year: number = new Date().getFullYear();

    // tslint:disable-next-line: max-line-length
    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                private authenticationService: AuthenticationService,
                private landaService: LandaService,
    ) {
    }

    ngOnInit() {
        this.signupForm = this.formBuilder.group({
            name: ['', Validators.required],
            address: ['', Validators.required],
            gender: ['', Validators.required],
            username: ['', Validators.required],
            number: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required]
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
    }

    // ngAfterViewInit() {
    // }

    // convenience getter for easy access to form fields
    get f() {
        return this.signupForm.controls;
    }

    /**
     * On submit form
     */
    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.signupForm.invalid) {
            return;
        }

        // this.authenticationService.register(this.f.email.value, this.f.password.value).then((res: any) => {
        //     this.successmsg = true;
        //     if (this.successmsg) {
        //         this.router.navigate(['/home']);
        //     }
        // })
        //     .catch(error => {
        //         this.error = error ? error : '';
        //     });

        this.landaService.DataPost('/kasir/register', {
            email: this.f.email.value,
            nama: this.f.name.value,
            jeniskelamin : this.f.gender.value,
            alamat : this.f.address.value,
            telepon : this.f.number.value,
            username : this.f.username.value,
            password: this.f.password.value,
            confirmpassword: this.f.confirmPassword.value,
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
                            this.router.navigate(['/auth/login']);
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
