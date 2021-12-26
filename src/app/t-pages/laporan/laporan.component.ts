import { Component, OnInit } from '@angular/core';
import * as jspdf from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-laporan',
  templateUrl: './laporan.component.html',
  styleUrls: ['./laporan.component.scss']
})
export class LaporanComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  download() {
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
}
