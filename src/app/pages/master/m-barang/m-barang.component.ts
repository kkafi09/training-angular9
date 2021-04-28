import { Component, OnInit, ViewChild } from '@angular/core';
import { DataTableDirective } from 'angular-datatables';
import { LandaService } from '../../../core/services/landa.service';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-m-barang',
  templateUrl: './m-barang.component.html',
  styleUrls: ['./m-barang.component.scss']
})
export class MBarangComponent implements OnInit {
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtInstance: Promise<DataTables.Api>;
  dtOptions: any;
  apiURL = environment.apiURL;
  ckEditorConfig: Array<{}>;
  breadCrumbItems: Array<{}>;
  pageTitle: string;
  isView: boolean;
  isEdit: boolean;
  ckeConfig: any;
  model: any = {

  };
  modelParam: {
    nama
  }
  listData: any;
  showForm: boolean;
  listkategori: any;

  constructor(private LandaService: LandaService, private router: Router) { }

  ngOnInit() {

    // this.ckeConfig = {
    //   allowedContent: true,
    //   filebrowserUploadUrl: this.apiURL + '/apppengumuman/uploadGambarPengumuman',

    //   filebrowserUploadMethod: "form",
    //   forcePasteAsPlainText: true,
    //   font_names: 'Arial;Times New Roman;Verdana;Comic-Sans',
    //   toolbarGroups: [
    //     { name: 'document', groups: ['mode', 'document', 'doctools'] },
    //     { name: 'clipboard', groups: ['clipboard', 'undo'] },
    //     { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
    //     { name: 'forms', groups: ['forms'] },
    //     '/',
    //     { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
    //     { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
    //     { name: 'links', groups: ['links'] },
    //     { name: 'insert', groups: ['Image', 'insert'] },
    //     '/',
    //     { name: 'styles', groups: ['styles'] },
    //     { name: 'colors', groups: ['colors'] },
    //     { name: 'tools', groups: ['tools'] },
    //     { name: 'others', groups: ['others'] },
    //     { name: 'about', groups: ['about'] }
    //   ],

    // };


    this.pageTitle = "Master Barang";
    this.breadCrumbItems = [{
      label: 'Master'
    }, {
      label: 'Master Barang',
      active: true
    }];
    this.modelParam = {
      nama: ''
    }
    this.getData();
    this.empty();
  }
  empty() {
    this.model = {

    };
    this.getData();
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
        this.LandaService.DataGet('/m_barang/index', params).subscribe((res: any) => {
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
  getStatus() {
    this.LandaService.DataGet('/m_barang/kategori', {}).subscribe((res: any) => {
      this.listkategori = res.data;
    });
  }

  index() {
    this.showForm = !this.showForm;
    this.pageTitle = 'Data Master Barang';
    this.getData();
  }
  create() {
    this.empty();
    this.showForm = !this.showForm;
    this.pageTitle = 'Tambah Data Barang';
    this.isView = false
    this.getStatus()
  }
  edit(val) {
    this.showForm = !this.showForm;
    this.model = val;
    this.model.tanggal = this.toDate(this.model.tanggal);
    this.pageTitle = 'Master Barang : ' + val.nama;
    this.isView = false;
    this.isEdit = true;
    this.getData();
    this.getStatus()
  }
  view(val) {
    this.showForm = !this.showForm;
    this.model = val;
    this.pageTitle = 'Master Barang : ' + val.nama;
    this.model.tanggal = this.toDate(this.model.tanggal);
    this.isView = true;
    this.isEdit = false;
    this.getData();
    this.getStatus();

  }
  save() {
    const final = Object.assign(this.model);

    this.LandaService.DataPost('/m_barang/save', final).subscribe((res: any) => {
      if (res.status_code === 200) {
        this.LandaService.alertSuccess('Berhasil', 'Data Barang Telah Tersimpan');
        this.index();
      } else {
        this.LandaService.alertError('Mohon Maaf', res.errors);
      }
    });
  }
  delete(val) {
    const data = {
      id: val != null ? val.id : null,
      is_deleted: 1,
    };
    Swal.fire({
      title: 'Apakah Anda Yakin ?',
      text: 'Menghapus Data Master Akan Berpengaruh Terhadap Data Lainnya',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Ya, Hapus Data Ini'
    }).then(result => {
      this.LandaService.DataPost('/m_barang/hapus', data).subscribe((res: any) => {
        if (res.status_code === 200) {
          this.LandaService.alertSuccess('Berhasil', 'Data Master Berhasil Terhapus');
          this.reloadDataTable();
        } else {
          this.LandaService.alertError('Mohon Maaf', res.errors);
        }
      })
    })
  }

  reloadDataTable(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.draw();
    });
  }

  toDate(dob) {
    if (dob) {
      const [year, month, day] = dob.split('-');
      const obj = {
        year: parseInt(year),
        month: parseInt(month),
        day: parseInt(day.split(' ')[0].trim()),
      };
      return obj;
    }
  }






}
