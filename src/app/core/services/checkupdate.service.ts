import { Injectable } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CheckupdateService {

 constructor(private readonly updates: SwUpdate) {
  
}

getUpdate(){
    setInterval(() => {this.isAvailable()}, 30000);
}

isAvailable(){
    console.log('cek update');
    this.updates.available.subscribe(event => {
        console.log('update available');
        this.showAppUpdateAlert();
    });
}

showAppUpdateAlert() {
  const header = 'App Update available';
  const message = 'Choose Ok to update';
  const action = this.doAppUpdate;
  const caller = this;
  // Use MatDialog or ionicframework's AlertController or similar
  Swal.fire({
            title: 'Perhatian',
            text: 'Terdapat pembaruan pada sistem Humanis, silahkan klik Perbarui Sistem ',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#34c38f',
            cancelButtonColor: '#f46a6a',
            confirmButtonText: 'Perbarui Sistem'
        }).then(result => {
            if (result.value) {
                this.doAppUpdate()
            }
        });
}

doAppUpdate() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
