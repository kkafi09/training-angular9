import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { Router, ActivatedRoute } from '@angular/router';
class FirebaseAuthBackend {
    route = new ActivatedRoute();

    constructor(firebaseConfig) {
        if (firebaseConfig) {
            // Initialize Firebase
            firebase.initializeApp(firebaseConfig);
            firebase.auth().onAuthStateChanged((user) => {
                if (user) {
                    // localStorage.setItem('userDetail', JSON.stringify(user));
                } else {
                    // if (this.route.snapshot.paramMap.get('user') !== null) {
                        // Do Nothing
                    // }else{
                       // localStorage.removeItem('userDetail');
                    // }
                }
            });
        }
    }
    /**
     * Registers the user with given details
     */
    registerUser = (email, password) => {
        return new Promise((resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(email, password).then((res: any) => {
                const user: any = firebase.auth().currentUser;
                resolve(user);
            }, (error) => {
                reject(this._handleError(error));
            });
        });
    }
    /**
     * Login user with given details
     */
    loginUser = (email, password) => {
        return new Promise((resolve, reject) => {
            firebase.auth().signInWithEmailAndPassword(email, password).then((res: any) => {
                // eslint-disable-next-line no-redeclare
                const user: any = firebase.auth().currentUser;
                this.setDetailUser(user);
                resolve(user);
            }, (error) => {
                reject(this._handleError(error));
            });
        });
    }
    
    loginWithGoogle(){
        return new Promise((resolve, reject) => {
            var provider = new firebase.auth.GoogleAuthProvider();
            provider.addScope('profile');
            provider.addScope('email');
            console.log(provider);
            firebase.auth().signInWithPopup(provider).then((res: any) => {
                // eslint-disable-next-line no-redeclare
                const user: any = firebase.auth().currentUser;
                user.emailActive = res.additionalUserInfo.profile.email;
                this.setDetailUser(user);
                resolve(user);
            }, (error) => {
                reject(this._handleError(error));
            });
        });
       
    }
    /**
     * forget Password user with given details
     */
    forgetPassword = (email) => {
        return new Promise((resolve, reject) => {
            // tslint:disable-next-line: max-line-length
            firebase.auth().sendPasswordResetEmail(email, {
                url: window.location.protocol + '//' + window.location.host + '/login'
            }).then(() => {
                resolve(true);
            }).catch((error) => {
                reject(this._handleError(error));
            });
        });
    }
    /**
     * Logout the user
     */
    logout = () => {
        return new Promise((resolve, reject) => {
            firebase.auth().signOut().then(() => {
                localStorage.removeItem('userDetail');
                resolve(true);
            }).catch((error) => {
                reject(this._handleError(error));
            });
        });
    }
    /**
     * Mengambil detail user dari collection users di firebase
     */
    setDetailUser(user: string) {
        return new Promise((resolve, reject) => {
            localStorage.setItem('userDetail', JSON.stringify(user));
            resolve(true);
        });
    }
    /**
     * set client yang aktif
     */
    setActiveClient(userId: string, type: string) {
        return new Promise((resolve, reject) => {
            firebase.firestore().collection('client').where(type + '.' + userId, '==', true).get().then((resClient: any) => {
                const client: any = [];
                resClient.forEach(function(doc) {
                    client.push(doc.data());
                });
                /**
                 * Set client pertama sebagai client aktif / default
                 */
                if (!localStorage.getItem('userDetail')) {
                    return null;
                }
                const user = JSON.parse(localStorage.getItem('userDetail'));
                user.client.admin = client[0].admin;
                user.client.db = client[0].db;
                user.client.nama = client[0].nama;
                localStorage.setItem('userDetail', JSON.stringify(user));
                resolve(client);
            }, (error) => {
                reject(this._handleError(error));
            });
        });
    }
    /**
     * Set perusahaan yang aktif
     */
    setActiveCompany(companyData: any) {
        if (!localStorage.getItem('userDetail')) {
            return null;
        }
        const user = JSON.parse(localStorage.getItem('userDetail'));
        user.company = companyData;
        return localStorage.setItem('userDetail', JSON.stringify(user));
    }
    /**
     * Set user yang login ke session storage
     */
    setLoggeedInUser = (user) => {
        localStorage.setItem('userDetail', JSON.stringify(user));
    }
    /**
     * Returns the detail user
     */
    getDetailUser = () => {
        if (!localStorage.getItem('userDetail')) {
            return null;
        }
        return JSON.parse(localStorage.getItem('userDetail'));
    }
    /**
     * Returns the detail client
     */
    getActiveClient = () => {
        if (!localStorage.getItem('userDetail')) {
            return null;
        }
        const user = JSON.parse(localStorage.getItem('userDetail'));
        return user.client;
    }
    /**
     * Returns the detail company
     */
    getActiveCompany = () => {
        if (!localStorage.getItem('companyActive')) {
            return null;
        }
        const user = JSON.parse(localStorage.getItem('userDetail'));
        return user.company;
    }
    /**
     * Returns the authenticated user
     */
    getAuthenticatedUser = () => {
        if (!localStorage.getItem('userDetail')) {
            return null;
        }
        return JSON.parse(localStorage.getItem('userDetail'));
    }
    /**
     * Handle the error
     * @param {*} error
     */
    _handleError(error) {
        const errorMessage = error.message;
        return errorMessage;
    }
}
let _fireBaseBackend = null;
/**
 * Initilize the backend
 * @param {*} config
 */
const initFirebaseBackend = (config) => {
    if (!_fireBaseBackend) {
        _fireBaseBackend = new FirebaseAuthBackend(config);
    }
    return _fireBaseBackend;
};
/**
 * Returns the firebase backend
 */
const getFirebaseBackend = () => {
    return _fireBaseBackend;
};
export {
    initFirebaseBackend,
    getFirebaseBackend
};