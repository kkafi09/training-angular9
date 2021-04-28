import { Injectable } from '@angular/core';
import { getFirebaseBackend } from '../../authUtils';
import { User, UserDetail } from '../models/auth.models';
import { LandaService } from './landa.service';

@Injectable({ providedIn: 'root' })

export class AuthenticationService {
    user: User;
    userDetail: UserDetail;
    constructor() {
    }
    /**
     * Returns the current user
     */
    public currentUser(): User {
        return getFirebaseBackend().getAuthenticatedUser();
    }

    /**
     * Returns the current detail user
     */
    public getDetailUser(): UserDetail {
        return getFirebaseBackend().getDetailUser();
    }

    /**
     * Returns the current client
     */
    public getActiveClient() {
        return getFirebaseBackend().getActiveClient();
    }

    /**
     * Returns the current company
     */
    public getActiveCompany() {
        return getFirebaseBackend().getActiveCompany();
    }

    /**
     * Returns set active company
     */
    public setDetailUser(payload: any) {
        return getFirebaseBackend().setDetailUser(payload);
    }

    /**
     * Performs the auth
     * @param email email of user
     * @param password password of user
     */
    login(email: string, password: string) {
        return getFirebaseBackend().loginUser(email, password).then((response: any) => {
            const user = response;
            return user;
        });
    }
    loginWithGoogle() {
        return getFirebaseBackend().loginWithGoogle().then((response: any) => {
            const user = response;
            return user;
        });
    }

    /**
     * Performs the register
     * @param email email
     * @param password password
     */
    register(email: string, password: string) {
        return getFirebaseBackend().registerUser(email, password).then((response: any) => {
            const user = response;
            return user;
        });
    }

    /**
     * Reset password
     * @param email email
     */
    resetPassword(email: string) {
        return getFirebaseBackend().forgetPassword(email).then((response: any) => {
            const message = response.data;
            return message;
        });
    }

    /**
     * Logout the user
     */
    logout() {
        // logout the user
        return getFirebaseBackend().logout();
    }
}

