import {Component, OnInit} from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

@Component({
    selector: 'app-laporan',
    templateUrl: './laporan.component.html',
    styleUrls: ['./laporan.component.scss']
})
export class LaporanComponent implements OnInit {
    title = 'export-to-excel';
    filename = 'excel.xlsx';
    tableLaporan = [
        {id: 'jdskf2389', time: '6/12/2021', kasir: 'budi', total: '40000', jenisPembayaran: 'Non-Tunai', customer: 'member'},
        {id: 'dajl98dsf', time: '7/12/2021', kasir: 'ahmad', total: '40000', jenisPembayaran: 'Tunai', customer: 'Non-member'},
        {id: 'adjl99shd', time: '8/12/2021', kasir: 'kafi', total: '40000', jenisPembayaran: 'Non-Tunai', customer: 'member'},
        {id: 'sdha898sd', time: '8/12/2021', kasir: 'nugroho', total: '40000', jenisPembayaran: 'Tunai', customer: 'member'},
        {id: 'adjk89s8s', time: '10/12/2021', kasir: 'alby', total: '40000', jenisPembayaran: 'Tunai', customer: 'Non-member'}
    ];


    constructor() {
    }

    ngOnInit(): void {

    }

    downloadPDF() {
        const element = document.getElementById('table');
        html2canvas(element).then((canvas) => {
            console.log(canvas);
            const imgWidth = 208;
            const pageHeigh = 295;
            const imgHeigh = canvas.height * imgWidth / canvas.width;
            const heighLeft = imgHeigh;
            const date = new Date();
            const dtr = '' + date;

            const imgData = canvas.toDataURL('image/png');

            const doc = new jspdf.jsPDF('p', 'mm', 'a4');
            const position = 20;
            doc.setFontSize(8);
            doc.text(dtr, 10, 10);
            doc.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeigh);

            doc.save('laporan.pdf');
        });
    }

    downloadExcel() {
        const element = document.getElementById('table');
        const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

        const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

        XLSX.writeFile(wb, this.filename);
    }
}
