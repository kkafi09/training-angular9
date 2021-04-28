import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '../services/auth.service';
import { LandaService } from '../services/landa.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private landaService: LandaService
    ) { }

    has(obj, key){
        return obj ? Object.prototype.hasOwnProperty.call(obj, key) : false;
    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        this.landaService.DataGet('/site/session', {}).subscribe((res: any) => {
            if (res.data == undefined) {
                this.authenticationService.logout();
                this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
                return false;
            }
        });       
        const currentUser = this.authenticationService.getDetailUser();
        if (currentUser && currentUser != null) {
            let route = state.url.substr(1);
            let routeSplice = route.split('/');

            //let newRoute = routeSplice[0] + '_' + routeSplice[1];
            //let akses = currentUser.akses[newRoute]; 
            //let globalmenu = ["home_undefined", "", "account_login"];
            
            //if(globalmenu.indexOf(newRoute) >= 0){
                // Do nothing
            //}else if (this.has(akses, 'view') && akses['view']) {
                // Do nothing    
            //} else {
                // this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
                // return false;
            //}

            // logged in so return true
            return true;
        }

        // // not logged in so redirect to login page with the return url
        this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}
