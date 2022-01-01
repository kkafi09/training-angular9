import {Component, OnInit} from '@angular/core';
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
    products: any[] = [];

    constructor(private modalService: NgbModal, private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
        this.products = [
            { name: 'Ayam goreng', category: 'Makanan', price: '20.000'},
            { name: 'Nasi goreng', category: 'Makanan', price: '20.000'},
            { name: 'Kopi', category: 'Minuman', price: '20.000'},
            { name: 'Es Jeruk', category: 'Minuman', price: '20.000'},
            { name: 'Teh', category: 'Minuman', price: '20.000'}
        ];

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
