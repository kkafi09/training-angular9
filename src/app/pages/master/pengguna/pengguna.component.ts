import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { LandaService } from '../../../core/services/landa.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-pengguna',
  templateUrl: './pengguna.component.html',
  styleUrls: ['./pengguna.component.scss']
})
export class PenggunaComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtOptions: any;
  breadCrumbItems: Array<{}>;
  pageTitle: string;
  isView: boolean;
  isEdit: boolean;
  modelParam: {
    nama,
    kategori

  }
  listData: any;
  listJabatan: any;
  listAkses: any;
  showForm: boolean;
  listKabupaten: any;
  listProvinsi: any;
  listSupplier: any;
  listStatus: any;

  modelCheck: {
    DataMaster
  }
  model: {
    nama,
    password,
    username,


    akses: {
      barang,
      pengguna

    }
  };

  constructor(private landaService: LandaService, private router: Router) { }

  ngOnInit(): void {
    this.pageTitle = 'Pengguna';
    this.breadCrumbItems = [{
      label: 'Master'
    }, {
      label: 'Pengguna',
      active: true
    }];
    this.modelParam = {
      nama: '',
      kategori: ''

    }
    this.getData();
    this.empty();
  }

  reloadDataTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  getData() {
    this.dtOptions = {
      serverSide: true,
      processing: true,
      ordering: false,
      pagingType: 'full_numbers',
      ajax: (dataTablesParameters: any, callback) => {
        const params = {
          filter: JSON.stringify(this.modelParam),
          offset: dataTablesParameters.start,
          limit: dataTablesParameters.length,
        };
        this.landaService
          .DataGet('/m_pengguna/index', params)
          .subscribe((res: any) => {
            this.listData = res.data.list;

            callback({
              recordsTotal: res.data.totalItems,
              recordsFiltered: res.data.totalItems,
              data: [],
            });
          });
      },
    };
  }



  empty() {
    this.modelCheck = {
      DataMaster: false
    }
    this.model = {
      nama: "",
      password: "",
      username: "",


      akses: {
        barang: false,
        pengguna: false
      }


    }
    this.getData();
  }

  checkAllKolom(val, arr) {
    arr.forEach((value: any, key: any) => {
      Object.keys(value).forEach(key => {
        if (val) {
          this.model.akses[value] = true;
        } else {
          this.model.akses[value] = false;

        }
      });

    });
  }

  index() {
    this.showForm = !this.showForm;
    this.pageTitle = 'Data Pengguna';
    this.getData();


  }

  create() {
    this.empty();
    this.showForm = !this.showForm;
    this.pageTitle = 'Tambah Data Pengguna';
    this.isView = false;

  }

  edit(val) {
    this.showForm = !this.showForm;
    this.model = val;
    this.model.password = '';
    this.pageTitle = 'Pengguna : ' + val.nama;
    this.getData();
    this.isView = false;
    this.isEdit = true;


  }
  view(val) {
    this.showForm = !this.showForm;
    this.model = val;
    this.pageTitle = 'Pengguna : ' + val.nama;
    this.getData();
    this.getStatus();
    this.isView = true;
  }

  save() {
    const final = Object.assign(this.model);
    this.landaService.DataPost('/m_pengguna/save', final).subscribe((res: any) => {
      if (res.status_code === 200) {
        this.landaService.alertSuccess('Berhasil', 'Data Pengguna telah disimpan!');
        this.index();
      } else {
        this.landaService.alertError('Mohon Maaf', res.errors);
      }
    });

  }
  getStatus() {
    this.landaService.DataGet('/m_status/index', {}).subscribe((res: any) => {
      this.listStatus = res.data.list;

    })
  }
  getSup() {
    this.landaService.DataGet('/m_supplier/index', {}).subscribe((res: any) => {
      this.listSupplier = res.data.list;

    });
  }





  delete(val) {
    const data = {
      id: val != null ? val.id : null,
      is_deleted: 1,
    };
    Swal.fire({
      title: 'Apakah anda yakin ?',
      text: 'Menghapus data Pengguna akan berpengaruh terhadap data lainnya',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Ya, Hapus data ini !'
    }).then(result => {

      if (result.value) {
        this.landaService.DataPost('/m_pengguna/delete', data).subscribe((res: any) => {
          if (res.status_code === 200) {
            this.landaService.alertSuccess('Berhasil', 'Data Pengguna telah dihapus !');
            this.reloadDataTable();

          } else {
            this.landaService.alertError('Mohon Maaf', res.errors);
          }
        });
      }
    });
  }



}




