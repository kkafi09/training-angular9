import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../../../core/services/auth.service';
import { MessagingService } from '../../../core/services/messaging.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LandaService } from '../../../core/services/landa.service';
@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
/**
 * Login component
 */
export class LoginComponent implements OnInit, AfterViewInit {
    loginForm: FormGroup;
    submitted = false;
    error = '';
    idRegis: any;
    // set the currenr year
    year: number = new Date().getFullYear();
    listGambar: any = [];
    particlesJS: any;
    // tslint:disable-next-line: max-line-length
    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private messagingService: MessagingService,
        public landaService: LandaService
    ) { }
    ngOnInit() {
        this.loginForm = this.formBuilder.group({
            email: ['', [Validators.required]],
            password: ['', Validators.required],
        });
        // reset login status
        this.authenticationService.logout();
        this.messagingService.requestPermission();
        this.messagingService.receiveMessage();
        this.messagingService.getToken().then((data) => {
            this.idRegis = data;
        });


        // this.getIcon();
    }
    ngAfterViewInit() { }
    // convenience getter for easy access to form fields
    get f() {
        return this.loginForm.controls;
    }

    /**
     * Get token
     */
    async getToken() {
        return await this.messagingService.getToken();
    }


    /**
     * Form submit
     */
    async loginWithGoogle() {
        this.authenticationService
            .loginWithGoogle()
            .then((res: any) => {
                /**
                 * Ambil detail user dari firebase & perusahaan aktif
                 */
                const user = this.authenticationService.currentUser();
                this.landaService
                    .DataPost('/site/setSessions', {
                        registrationToken: this.idRegis,
                        email: res.emailActive,
                        uid: user.uid,
                        accessToken: user.stsTokenManager.accessToken,
                        sumber: 1,
                    })
                    .subscribe((res: any) => {
                        /**
                         * Simpan detail user ke session storage
                         */
                        if (res.status_code == 200) {
                            this.authenticationService
                                .setDetailUser(res.data.user)
                                .then(() => {
                                    this.router.navigate(['/home']);
                                })
                                .catch((error) => {
                                    this.error =
                                        'Terjadi kesalahan pada server';
                                });
                        } else {
                            this.error = res.errors[0];
                        }
                    });
            })
            .catch((error) => {
                this.error = error ? error : '';
            });
    }
    async onSubmit() {
        this.landaService
            .DataPost('/site/setSessions', {
                email: this.f.email.value,
                password: this.f.password.value,
                sumber: 1,
            })
            .subscribe((res: any) => {
                /**
                 * Simpan detail user ke session storage
                 */
                if (res.status_code == 200) {
                    this.authenticationService
                        .setDetailUser(res.data.user)

                        .then(() => {

                            this.router.navigate(['/home']);
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
