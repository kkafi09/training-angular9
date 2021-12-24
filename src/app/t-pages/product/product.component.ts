import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ModalDismissReasons, NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  closeResult = '';
  productForm: FormGroup;
  submitted = false;

  products: any = [
    {id: 1, name: 'Ayam goreng', category: 'Makanan', price: '20.000'},
    {id: 2, name: 'Nasi goreng', category: 'Makanan', price: '20.000'},
    {id: 5, name: 'Kopi', category: 'Minuman', price: '20.000'},
    {id: 3, name: 'Es Jeruk', category: 'Minuman', price: '20.000'},
    {id: 4, name: 'Teh', category: 'Minuman', price: '20.000'}
  ];

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      price: ['', [Validators.required]],
      hpp: ['', [Validators.required]]
    }, {});
  }


  get f() {
    return this.productForm.controls;
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
