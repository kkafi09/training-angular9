import { Component, Injectable } from '@angular/core';
import {
    NgbCalendar,
    NgbDateAdapter,
    NgbDateParserFormatter,
    NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';
import { MessagingService } from './core/services/messaging.service';
import { CheckupdateService } from './core/services/checkupdate.service';

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class CustomAdapter extends NgbDateAdapter<string> {
    readonly DELIMITER = '-';
    fromModel(value: string | null): NgbDateStruct | null {
        if (value) {
            const date = value.split(this.DELIMITER);
            return {
                day: parseInt(date[0], 10),
                month: parseInt(date[1], 10),
                year: parseInt(date[2], 10),
            };
        }
        return null;
    }
    toModel(date: NgbDateStruct | null): string | null {
        return date
            ? date.day +
                  this.DELIMITER +
                  date.month +
                  this.DELIMITER +
                  date.year
            : null;
    }
}
/**
 * This Service handles how the date is rendered and parsed from keyboard i.e. in the bound input field.
 */
@Injectable()
export class CustomDateParserFormatter extends NgbDateParserFormatter {
    readonly DELIMITER = '/';
    parse(value: string): NgbDateStruct | null {
        if (value) {
            const date = value.split(this.DELIMITER);
            return {
                day: parseInt(date[0], 10),
                month: parseInt(date[1], 10),
                year: parseInt(date[2], 10),
            };
        }
        return null;
    }
    format(date: NgbDateStruct | null): string {
        return date
            ? date.day +
                  this.DELIMITER +
                  date.month +
                  this.DELIMITER +
                  date.year
            : '';
    }
}
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent {
    title = 'push-notification';
    message: any;
    constructor(private messagingService: MessagingService, private checkUpdate: CheckupdateService) {}
    ngOnInit() {
        this.checkUpdate.getUpdate();
        this.messagingService.requestPermission();
        this.messagingService.receiveMessage().then(()=>{
            
        });
        this.message = this.messagingService.currentMessage;
    }
}
