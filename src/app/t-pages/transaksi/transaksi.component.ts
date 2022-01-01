import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-transaksi',
  templateUrl: './transaksi.component.html',
  styleUrls: ['./transaksi.component.scss']
})
export class TransaksiComponent implements OnInit {

  closeResult = '';
  tableTransaksi = [
    {id: 'jdskf2389', time: '6/12/2021', kasir: 'budi', total: '40000', jenisPembayaran: 'Non-Tunai', customer: 'member'},
    {id: 'dajl98dsf', time: '7/12/2021', kasir: 'ahmad', total: '40000', jenisPembayaran: 'Tunai', customer: 'Non-member'},
    {id: 'adjl99shd', time: '8/12/2021', kasir: 'kafi', total: '40000', jenisPembayaran: 'Non-Tunai', customer: 'member'},
    {id: 'sdha898sd', time: '8/12/2021', kasir: 'nugroho', total: '40000', jenisPembayaran: 'Tunai', customer: 'member'},
    {id: 'adjk89s8s', time: '10/12/2021', kasir: 'alby', total: '40000', jenisPembayaran: 'Tunai', customer: 'Non-member'}
  ];

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
