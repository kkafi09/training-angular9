import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class MessagingService {
    currentMessage = new BehaviorSubject(null);
    constructor(private angularFireMessaging: AngularFireMessaging) {
        this.angularFireMessaging.messaging.subscribe((messaging: any) => {
            messaging._next = (payload: any) => {
                this.currentMessage.next(payload);
            };
        });
    }
    getToken() {
        return new Promise((resolve, reject) => {
            this.angularFireMessaging.getToken.subscribe(
            (token) => {
                resolve(token);
            },
            (err) => {
                reject(err);
                console.error('Unable to get permission to notify.', err);
            }
        ); });
    }
    requestPermission() {
        this.angularFireMessaging.requestToken.subscribe(
            (token) => {
                return token;
                // console.log(token);
            },
            (err) => {
                return false;
                // console.error("Unable to get permission to notify.", err);
            }
        );
    }
    receiveMessage() {
        return new Promise((resolve, reject) => { this.angularFireMessaging.messages.subscribe((payload) => {
            this.currentMessage.next(payload);
        });
         });
    }
}
