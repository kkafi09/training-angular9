import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { LandaService } from '../../../../core/services/landa.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-button-import',
  templateUrl: './buttonimport.component.html',
  styleUrls: ['./buttonimport.component.scss']
})
export class ButtonimportComponent implements OnInit {
    apiURL = environment.apiURL;
    @Input() url: string;
    @Input() tipe: any;
    @Input() urlDownload: string;
    @Output() returnData = new EventEmitter<any>();
    selectedFile: null;
    listImport: any;
    download: any;
    urlDownloadReferensi: any;
    urlImportKontakDarurat: any;
    urlImportKeluarga: any;
    urlImportPendidikan: any;
    urlImportSertifikat: any;
    urlImportPelatihan: any;


    constructor(private landaService: LandaService) { }

    ngOnInit() {
        this.urlDownload = this.apiURL + this.urlDownload;
        this.urlDownloadReferensi =  this.apiURL + '/appkaryawan/downloadReferensi';
        this.urlImportKontakDarurat ='/appkaryawan/importKontakDarurat';
        this.urlImportKeluarga ='/appkaryawan/importKeluarga';
        this.urlImportPendidikan ='/appkaryawan/importPendidikan';
        this.urlImportSertifikat ='/appkaryawan/importSertifikat';
        this.urlImportPelatihan ='/appkaryawan/importPelatihan';

    }

    onFileSelected(event, url) {
        if (event.target.files && event.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e: any) => {
                const imgBase64Path = e.target.result;
                this.selectedFile = imgBase64Path;

                const data = {
                    base64: this.selectedFile,
                    filename: event.target.files[0].name,
                    filesize: event.target.files[0].size,
                    filetype: event.target.files[0].type
                };
                this.landaService.DataPost(url, data).subscribe((res: any) => {
                    console.log(res)
                    if (res.status_code == 200) {
                        this.listImport = res.data;
                        this.returnData.emit(this.listImport);
                    } else {
                        this.landaService.alertError('Mohon Maaf',res.errors);
                    }
                }); 
            };
            reader.readAsDataURL(event.target.files[0]);
        }
    }

    downloadFormatExcel(urlDownload) {
        window.open(urlDownload, '_self');
    }
    downloadReferensi() {
        window.open(this.urlDownloadReferensi, '_self');
    }

    downloadReferensiAlamat() {
        window.open(this.apiURL + '/assets/formatExcel/Referensi Alamat.xlsx', '_self');
    }

    export() {
        window.open(this.apiURL + '/appkaryawan/export', '_self');
    }
    exportKontakDarurat() {
        window.open(this.apiURL + '/assets/formatExcel/Kontak-Darurat-Karyawan.xlsx', '_self');
    }
    exportKeluarga() {
        window.open(this.apiURL + '/assets/formatExcel/Keluarga-Karyawan.xlsx', '_self');
    }
    exportPendidikan() {
        window.open(this.apiURL + '/assets/formatExcel/Pendidikan-Karyawan.xlsx', '_self');
    }
    exportSertifikat() {
        window.open(this.urlDownloadReferensi + '?params=sertifikat', '_self');
    }
    exportPelatihan() {
        window.open(this.urlDownloadReferensi + '?params=pelatihan', '_self');
    }
}
