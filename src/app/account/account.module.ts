import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AccountRoutingModule } from "./account-routing.module";
import { AuthModule } from "./auth/auth.module";

import { initFirebaseBackend } from "./../authUtils";
import { ServiceWorkerModule } from "@angular/service-worker";
import { AngularFireMessagingModule } from "@angular/fire/messaging";
import { AngularFireModule } from "@angular/fire";
import { MessagingService } from "./../core/services/messaging.service";
import { environment } from "../../environments/environment";

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		AccountRoutingModule,
		AuthModule,
		ServiceWorkerModule.register("ngsw-worker.js", {
			enabled: environment.production,
		}),
		AngularFireMessagingModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
	],
	providers: [MessagingService],
})
export class AccountModule {}
