import { Component, OnInit } from '@angular/core';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-kasir',
  templateUrl: './kasir.component.html',
  styleUrls: ['./kasir.component.scss']
})
export class KasirComponent implements OnInit {

  closeResult = '';

  tableKasir = [
    {id: 1, name: 'Ayam goreng', price: '20000', qty: '2', discount: '0', total: '40000'},
    {id: 2, name: 'Nasi goreng', price: '20000', qty: '2', discount: '0', total: '40000'},
    {id: 5, name: 'Kopi', price: '20000', qty: '2', discount: '0', total: '40000'},
    {id: 3, name: 'Es Jeruk', price: '20000', qty: '2', discount: '0', total: '40000'},
    {id: 4, name: 'Teh', price: '20000', qty: '2', discount: '0', total: '40000'}
  ];

  constructor(private modalService: NgbModal) {
  }

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
