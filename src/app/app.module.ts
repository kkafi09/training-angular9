import {
    BrowserModule
} from '@angular/platform-browser';
import {
    BrowserAnimationsModule
} from '@angular/platform-browser/animations';
import {
    HttpClientModule
} from '@angular/common/http';
import {
    NgModule
} from '@angular/core';
import {
    initFirebaseBackend
} from './authUtils';
import {
    environment
} from '../environments/environment';
// import {
//     LayoutsModule
// } from './layouts/layouts.module';
import {
    AppRoutingModule
} from './app-routing.module';
import {
    AppComponent
} from './app.component';
import { AsyncPipe } from '@angular/common';
import { NgProgressModule } from 'ngx-progressbar';
import { NgProgressHttpModule } from 'ngx-progressbar/http';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
import { MessagingService } from './core/services/messaging.service';
import { NgbDateParserFormatter } from "@ng-bootstrap/ng-bootstrap";
import { NgbDateCustomParserFormatter } from "./core/date-formatter";


initFirebaseBackend(environment.firebaseConfig);
@NgModule({
    declarations: [
        AppComponent,

    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AppRoutingModule,
        NgProgressModule,
        NgProgressHttpModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
        AngularFireMessagingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
    ],
    // providers: [AsyncPipe],
    providers: [MessagingService, AsyncPipe,
        { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter }  // <-- add this
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
