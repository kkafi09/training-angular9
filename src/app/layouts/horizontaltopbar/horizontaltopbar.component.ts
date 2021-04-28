import { Component, OnInit, AfterViewInit, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { Router, NavigationEnd, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { EventService } from '../../core/services/event.service';
import { AuthenticationService } from '../../core/services/auth.service';
import { LandaService } from '../../core/services/landa.service';
import Swal from 'sweetalert2';
import { AngularFireMessaging } from '@angular/fire/messaging';


import { DOCUMENT } from '@angular/common';

@Component({
    selector: 'app-horizontaltopbar',
    templateUrl: './horizontaltopbar.component.html',
    styleUrls: ['./horizontaltopbar.component.scss'],
})

/**
 * Horizontal Topbar and navbar specified
 */
export class HorizontaltopbarComponent implements OnInit, AfterViewInit {
    element;
    configData;
    user;
    listPerusahaan;
    model: {
        id;
        kode;
        nama;
        password;
        repassword;
    };
    modelGbr: {
        logo_menu
    }
    listPengumuman: any = [];
    dataModalPengumuman: {
        judul,
        isi,
        tanggal,
        penulis
    }
    listGambar: any = [];


    // tslint:disable-next-line: max-line-length
    constructor(
        @Inject(DOCUMENT) private document: any,
        private router: Router,
        private eventService: EventService,
        private authService: AuthenticationService,
        private modalService: NgbModal,
        private landaService: LandaService,
        private angularFireMessaging: AngularFireMessaging

    ) {
        router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.activateMenu();
            }
        });
    }

    ngOnInit(): void {
        this.element = document.documentElement;

        this.configData = {
            suppressScrollX: true,
            wheelSpeed: 0.3,
        };
        this.listPerusahaan = [];

        this.user = this.authService.getDetailUser();
        // this.getIcon();

    }


    checkAkses(hakAkses) {

        return this.landaService.checkAkses(hakAkses);
    }
    // checkSubAkses(hakAkses, subAkses) {
    //     return this.landaService.checkSubAkses(hakAkses, subAkses);

    // }

    gantiPassword(modal) {
        this.modalService.open(modal, { size: 'md' });
        this.model = {
            id: '',
            kode: '',
            nama: '',
            password: '',
            repassword: '',
        };
    }
    savepasswords() {
        const data = this.model.password;


        Swal.fire({
            title: 'Apakah anda yakin ?',
            text: 'Mengubah password anda',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#34c38f',
            cancelButtonColor: '#f46a6a',
            confirmButtonText: 'Ya, ubah password !'
        }).then(result => {
            if (result.value) {
                this.landaService.DataPost('/m_pengguna/updatePassword', { data }).subscribe((res: any) => {
                    if (res.status_code === 200) {
                        this.landaService.alertSuccess('Berhasil', 'Data Password Baru telah disimpan !');
                    } else {
                        this.landaService.alertError('Mohon Maaf', res.errors);
                    }
                });
            }
        });
    }


    /**
     * Action logout
     */
    logout() {
        this.landaService
            .DataGet('/site/logout', {})
            .subscribe((res: any) => {
                this.authService
                    .logout()
                    .then((res: any) => {
                        this.router.navigate(['/account/login']);
                    })
                    .catch((error) => { });
            });
    }

    /**
     * On menu click
     */
    onMenuClick(event: any) {
        const nextEl = event.target.nextSibling;

        return false;
    }

    ngAfterViewInit() {
        this.activateMenu();
    }

    /**
     * remove active and mm-active class
     */
    _removeAllClass(className) {
        const els = document.getElementsByClassName(className);
        while (els[0]) {
            els[0].classList.remove(className);
        }
    }

    /**
     * Togglemenu bar
     */
    toggleMenubar() {
        const element = document.getElementById('topnav-menu-content');
        element.classList.toggle('show');
    }

    /**
     * Activates the menu
     */
    private activateMenu() {
        const resetParent = (el: any) => {
            const parent = el.parentElement;
            if (parent) {
                parent.classList.remove('active');
                const parent2 = parent.parentElement;
                this._removeAllClass('mm-active');
                this._removeAllClass('mm-show');
                if (parent2) {
                    parent2.classList.remove('active');
                    const parent3 = parent2.parentElement;
                    if (parent3) {
                        parent3.classList.remove('active');
                        const parent4 = parent3.parentElement;
                        if (parent4) {
                            parent4.classList.remove('active');
                            const parent5 = parent4.parentElement;
                            if (parent5) {
                                parent5.classList.remove('active');
                            }
                        }
                    }
                }
            }
        };

        // activate menu item based on location
        const links = document.getElementsByClassName('side-nav-link-ref');
        let matchingMenuItem = null;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < links.length; i++) {
            // reset menu
            resetParent(links[i]);
        }
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < links.length; i++) {
            // tslint:disable-next-line: no-string-literal
            if (location.pathname === links[i]['pathname']) {
                matchingMenuItem = links[i];
                break;
            }
        }

        if (matchingMenuItem) {
            const parent = matchingMenuItem.parentElement;
            /**
             * TODO: This is hard coded way of expading/activating parent menu dropdown and working till level 3.
             * We should come up with non hard coded approach
             */
            if (parent) {
                parent.classList.add('active');
                const parent2 = parent.parentElement;
                if (parent2) {
                    parent2.classList.add('active');
                    const parent3 = parent2.parentElement;
                    if (parent3) {
                        parent3.classList.add('active');
                        const parent4 = parent3.parentElement;
                        if (parent4) {
                            parent4.classList.add('active');
                            const parent5 = parent4.parentElement;
                            if (parent5) {
                                parent5.classList.add('active');
                            }
                        }
                    }
                }
            }
        }
    }

    /**
     * on settings button clicked from topbar
     */
    onSettingsButtonClicked() {
        document.body.classList.toggle('right-bar-enabled');
    }

    /**
     * Fullscreen method
     */
    fullscreen() {
        document.body.classList.toggle('fullscreen-enable');
        if (
            !document.fullscreenElement &&
            !this.element.mozFullScreenElement &&
            !this.element.webkitFullscreenElement
        ) {
            if (this.element.requestFullscreen) {
                this.element.requestFullscreen();
            } else if (this.element.mozRequestFullScreen) {
                /* Firefox */
                this.element.mozRequestFullScreen();
            } else if (this.element.webkitRequestFullscreen) {
                /* Chrome, Safari and Opera */
                this.element.webkitRequestFullscreen();
            } else if (this.element.msRequestFullscreen) {
                /* IE/Edge */
                this.element.msRequestFullscreen();
            }
        } else {
            if (this.document.exitFullscreen) {
                this.document.exitFullscreen();
            } else if (this.document.mozCancelFullScreen) {
                /* Firefox */
                this.document.mozCancelFullScreen();
            } else if (this.document.webkitExitFullscreen) {
                /* Chrome, Safari and Opera */
                this.document.webkitExitFullscreen();
            } else if (this.document.msExitFullscreen) {
                /* IE/Edge */
                this.document.msExitFullscreen();
            }
        }
    }

    /**
     * Topbar light
     */
    topbarLight() {
        document.body.setAttribute('data-topbar', 'light');
        document.body.removeAttribute('data-layout-size');
    }

    /**
     * Set boxed width
     */
    boxedWidth() {
        document.body.setAttribute('data-layout-size', 'boxed');
        document.body.setAttribute('data-topbar', 'dark');
    }

    /**
     * Colored header
     */
    coloredHeader() {
        document.body.setAttribute('data-topbar', 'colored');
        document.body.removeAttribute('data-layout-size');
    }

    /**
     * Change the layout onclick
     * @param layout Change the layout
     */
    changeLayout(layout: string) {
        this.eventService.broadcast('changeLayout', layout);
        window.location.reload();
    }


    // getIcon() {
    //     this.landaService
    //         .DataGet('/m_settingAplikasi/index', {})
    //         .subscribe((res: any) => {
    //             this.listGambar = res.data;
    //             this.listGambar.logo_menu = this.landaService.getImage('setting_aplikasi', this.listGambar.logo_menu);

    //         });
    // }



}