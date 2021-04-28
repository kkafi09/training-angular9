import {
    Injectable
} from '@angular/core';
import Swal from 'sweetalert2';
import {
    HttpClient,
    HttpHeaders,
} from '@angular/common/http';
import {
    Observable,
    throwError
} from 'rxjs';
import {
    retry,
    catchError
} from 'rxjs/operators';
import {
    environment
} from '../../../environments/environment';
import { AuthenticationService } from './auth.service';
@Injectable({
    providedIn: 'root'
})
export class LandaService {
    apiURL = environment.apiURL;
    imageURL = environment.imageURL;
    userDetail: any;
    httpOptions: any;
    user: any;

    constructor(private http: HttpClient, private authenticationService: AuthenticationService) {
        this.userDetail = this.authenticationService.getDetailUser();
        this.user = null;
        if (this.userDetail !== null && Object.prototype.hasOwnProperty.call(this.userDetail, 'safeEmailId')) {
            this.user = {
                client: this.userDetail.client,
                email: this.userDetail.email,
                foto: this.userDetail.foto,
                id: this.userDetail.id,
                jabatanTxt: this.userDetail.jabatanTxt,
                m_perusahaan: this.userDetail.m_perusahaan,
                nama: this.userDetail.nama,
                nik: this.userDetail.nik,
                safeEmail: this.userDetail.safeEmail,
                safeEmailId: this.userDetail.safeEmailId,
                statusTxt: this.userDetail.statusTxt,
                tipe: this.userDetail.tipe,
                uid: this.userDetail.uid,
                userId: this.userDetail.userId,
            }
        }
        console.log(this.user + 'asdasd');

        // console.log(user);

        this.httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + btoa(JSON.stringify(this.user))
            }),
            withCredentials: true
        };
    }

    ngOnInit(): void {

    }

    checkAkses(hakAkses) {
        this.userDetail = this.authenticationService.getDetailUser();
        let status = false;
        if (this.userDetail != null && Object.prototype.hasOwnProperty.call(this.userDetail, 'akses') && Object.prototype.hasOwnProperty.call(this.userDetail.akses, hakAkses)) {
            console.log(this.userDetail.akses[hakAkses]);
            if (Object.prototype.hasOwnProperty.call(this.userDetail.akses, hakAkses) && this.userDetail.akses[hakAkses]) {
                status = this.userDetail.akses[hakAkses];
            } else {
                status = false;
            }
        }
        if (this.userDetail != null && Object.prototype.hasOwnProperty.call(this.userDetail, 'type') && Object.prototype.hasOwnProperty.call(this.userDetail, hakAkses)) {

            if (Object.prototype.hasOwnProperty.call(this.userDetail, hakAkses) && this.userDetail[hakAkses]) {
                status = this.userDetail[hakAkses];
            } else {
                status = false;
            }
        }
        return status;
    }


    // checkSubAkses(hakAkses, subAkses) {
    //     this.userDetail = this.authenticationService.getDetailUser();
    //     let status = false;
    //     if (Object.prototype.hasOwnProperty.call(this.userDetail, 'akses') && Object.prototype.hasOwnProperty.call(this.userDetail.akses, hakAkses)) {
    //         if (Object.prototype.hasOwnProperty.call(this.userDetail.akses[hakAkses], subAkses) && this.userDetail.akses[hakAkses][subAkses]) {
    //             status = this.userDetail.akses[hakAkses][subAkses];
    //         } else {
    //             status = false;
    //         }
    //     }
    //     return status;
    // }



    getImage(folder: string, image: string) {
        let ret;

        if (image != '' && image != null && folder != '') {
            ret = this.imageURL + folder + '/' + image;
        } else if (image != '' && image != null && folder == '') {
            ret = this.imageURL + image;
        } else {
            ret = this.imageURL + 'default.png';
        }
        return ret;
    }
    DataGet(path, payloads) {
        return this.http.get(this.apiURL + path, { params: payloads, withCredentials: true, headers: this.httpOptions.headers });
    };
    DataPost(path, payloads, isHtml: boolean = false) {
        if (isHtml === true) {
            let reqHeader = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + btoa(JSON.stringify(this.user))
                }),
                responseType: 'text' as 'json',
                withCredentials: true
            };
            return this.http.post(this.apiURL + path, payloads, reqHeader);
        } else {
            let reqHeader = this.httpOptions;
            return this.http.post(this.apiURL + path, payloads, reqHeader);
        }

    }
    /**
     * Alert
     */
    alertSuccess(title, content) {
        Swal.fire(title, content, 'success');
    }
    /**
     * Alert ketika terjadi kesalahan
     * @param {[string]} title   [description]
     * @param {[array]} content [description]
     */
    alertError(title, content) {
        let isi = '';
        if (Array.isArray(content) == true) {
            content.forEach(function (element) {
                isi = isi + element + ' <br>';
            });
        } else {
            isi = String(content);
        }
        Swal.fire(title, isi, 'error');
    }
}
