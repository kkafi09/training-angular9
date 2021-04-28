# Humanis Backend Guideline

**Humanis Backend Guideline** merupakan sebuah standar dan panduan bagi backend engineer pada Proyek Humanis. Pastikan semua poin di bawah ini terpenuhi untuk kerapian coding, standarisasi coding, memudahkan serah terima kepada tim lain dan maintenance Sistem Humanis.

## 1. General Standard

### 1.1 .gitignore
Hal-hal berikut ini seharusnya dimasukkan ke dalam list `.gitignore` dan tidak boleh di push ke dalam repository:

+ direktori `vendors`
+ file upload dari user seperti di folder `assets/img`
+ file `config/config.php`
+ Informasi credential penting atau krusial seperti API KEY dll

### 1.2 Penamaan Variabel
Gunakan penamaan variable atau method yang singkat & jelas, serta tidak membingungkan. usahakan nama variabel berhubungan dengan data yang disimpan.

**good**:

`$user`, `$storeData`, `$debetAccount`

**bad**:

`$aaaa`, `$name1`, `$thisistoloongvariableyoumaynotseeit`

**bad**:

`$absensi = DATA_PENGGAJIAN`

### 1.3 CamelCase
Variabel / method menggunakan format `CamelCase` 

**Contoh**
+ `$dataLembur` bukan `$data_lembur`
+ `$pegawaiKontrak` bukan `$pegawai_kontrak`

### 1.4 Error message
Aktifkan Pesan Error pada server local / testing saja, pada server live matikan error / set default error ke halaman 500 atau lainnya

### 1.5 Sensitive Information
Jangan letakkan endoint atau informasi penting yang bersifat private secara hardcode di dalam source code fitur / modul yang dikerjakan, informasi tersebut bisa ditaruh di `config/config.php` 

## 2 PHP Coding Standard

### 2.1 Tempatkan file sesuai fungsi / groupingnya
+ `src/routes/` hanya routing, logika, atau pemanggilan method-method saja. 
+ `src/models` Query ke database / Script yang berhubungan dengan database 
+ `src/services/Landa.php` Function / method yang bersifat global

### 2.2 Jangan membuat action / script sendiri untuk memanggil data referensi
+ Apabila modul yang dikerjakan terdapat data yang mengambil referensi dari tabel lain. Jangan langsung membuat function / query untuk ambil data referensi tsb.
+ Cek terlebih dahulu apakah sudah ada function untuk menampilkan list data tersebut. bisa konfirmasi kepada teman-teman di group terlebih dahulu atau cek modelnya di `src/models`.
+ Jika sudah ada function yang dibutuhkan tinggal gunakan function tersebut, tidak perlu bikin function yang fungsi dan tujuannya sama untuk menghindari perbedaan output / hasil query di menu 1 dengan menu yang lainnya

### 2.3 DockBlock
+ Install ekstensi dockblock di Sublime / VS Code / Editor lain yang digunakan
+ Setiap membuat function / block kode yang agak panjang, tambahkan catatan dokumentasi function / block kode tersebut menggunakan standard DockBlock, acuannya dapat dilihat di [PHPDOC - DOCKBLOCK Basic Syntax](http://docs.phpdoc.org/references/phpdoc/basic-syntax.html)

### 2.4 Dead Code
Tidak boleh ada `Dead Code` saat push `master`. `Dead Code` adalah source code (method, attributes, class) yang sudah tidak digunakan akan tetapi masih tersimpan di dalam codebase dan biasanya hanya dinonaktifkan menggunakan `comment`, jika sewaktu-waktu membutuhkan kode yang dihapus tadi tinggal mencarinya di history gitlab.

```php
<?php

class Foo {
    
    /**
    * This is description of this class
    * this class may use recursion bla bla bla
    *
    * @param string $arg1
    * @param integer $arg2
    * @return array
    */
    public function bar($arg1, $arg2)
    {
        // some code

    }
    
    //public function deadcode($arg1, $arg2)
    //{
    // some DEAD CODE
    //
    //}
}
```
### 2.5 Try Catch & Throw
+ Gunakan blok try - catch untuk handling exception terutama di operasi yang berkaitan dengan I/O seperti database, HTTP request, file
+ Try & Catch berfungsi untuk menangkap error exception yang terjadi & memungkinkan aplikasi melakukan aksi tertentu terkait error tersebut.

**DONT**
+ Jangan biarkan technical error muncul / terbaca oleh client app/frontend.

```php
/**
* This is description of this class
*
* @param Request $request
* @return Response
*/
public function register(Request $request)
{
    try {
        $service = $this->applicationService->registerUser($user);
        return response()->json($service);
    } catch(Exception $e) {
        return response()->json(['error' => $e->getMessage()]);
    }
}
```

**DO**
+ Tampilkan pesan error yang human friendly ke client / frontend

```php
/**
* This is description of this class
*
* @param Request $request
* @return Response
*/
public function register(Request $request)
{
    try {
        $service = $this->applicationService->registerUser($user);
        return response()->json($service);
    } catch(Exception $e) {
        report($e);
        return response()->json(['error' => "Human Friendly Message"]);
    }
}
```

### 2.6 Proses Data Ke Banyak Tabel
Pada function / proses yang diharuskan untuk memproses data ke banyak tabel, wajib menggunakan LandaDb `startTransaction` dan `endTransaction`. Tujuannya apabila ada kesalahan proses ke salah satu tabel, semua data yang telah diinput di proses sebelumnya akan di `rollBack` / di kembalikan.

**DONT**
```php
public function save($data)
{
    $db = $this->db;
    try {
        $levelJabatan = $db->insert("m_level_jabatan", $data);
        $jabatan = $db->update("m_jabatan", $data, ["id" => $data['id']]);
    } catch(Exception $e) {
        report($e);
        return response()->json(['error' => "Human Friendly Message"]);
    }
}
```

**DO**
```php
public function save($data)
{
    $db = $this->db;
    try {
        /**
        * Memulai proses ke banyak tabel
        **/
        $db->startTransaction();
            
        $levelJabatan = $db->insert("m_level_jabatan", $data);
        $jabatan = $db->update("m_jabatan", $data, ["id" => $data['id']]);
        
        /**
        * Simpan data ke database apabila semua proses berjalan lancar
        **/
        $db->endTransaction();
    } catch(Exception $e) {
        report($e);
        return response()->json(['error' => "Human Friendly Message"]);
    }
}
```

### 2.7 Commit Ke Git
Pada waktu commit, pastikan mengisi keterangan sesuai dengan apa yang dikerjakan secara jelas. Ini bertujuan untuk tracking apa yang sudah dikerjakan dan mengembalikan dead code yang telah dihapus apabila sewaktu-waktu dibutuhkan

**good**
+ `Fix bug upload karyawan`
+ `Fitur baru import karyawan`

**bad**
+ `revisi 24-02-2020`
+ `---`
+ `tindik rabu siang`

### 2.8 Coding Global
+ Setiap block kode yang dieksekusi lebih dari sekali wajib dibuatkan function
+ Setiap block kode wajib diberi notice/dokumentasi tujuannya untuk apa
+ Penamaan variabel tidak boleh asal
+ Semua console.log di javascript harus dihapus jika modul sudah selesai dikerjakan
+ Semua code HTML, CSS, JS, PHP wajib di rapikan (bisa pake codeformatter dll)
+ Setiap tombol yang tidak ada text nya / hanya icon wajib diberi tooltip keterangannya
+ Jangan ada inline CSS
+ Tidak boleh asal copas, wajib tahu fungsi dan alur code yang di copas
+ Textfield angka rupiah wajib rata kanan
+ Menampilkan angka rupiah wajib rata kanan
+ Format tanggal gunakan format dd/mm/yyy => 01/05/2020
+ Semua inputan menggunakan class sm (bootstrap inputan kecil)
+ untuk angular 9 setelah menyelesaikan task, jalankan perintah `ng lint`, pastikan tidak ada ERROR yang muncul
+ Inputan yang harus diisi, wajib include class `required` pada labelnya. contoh `<label class="col-md-4 col-form-label col-form-label-sm required">No. Asuransi</label>`
+ Pastikan tampilan mobile (responsive) tidak rusak