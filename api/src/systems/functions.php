<?php
use Service\Landa;
use Service\Db;

function arr_date_to_string($date)
{
    $combine_date = $date['day'].'-'.$date['month'].'-'.$date['year'];

    return date('Y-m-d', strtotime($combine_date));
}

function twigView()
{
    return new \Slim\Views\Twig('src/views');
}
function generate_kodegaji($tahun, $bulan)
{
    $config = config('DB');
    $db = new Cahkampung\Landadb($config['db']);
    $cekKode = $db->select('kode')
    ->from('t_payroll')
    ->orderBy('kode DESC')
    ->find()
    ;
    if ($cekKode) {
        $kode_terakhir = $cekKode->kode;
    } else {
        $kode_terakhir = 0;
    }

    $tipe = 'PYR';
    $kode_item = (substr($kode_terakhir, -4) + 1);
    $kode = substr('0000'.$kode_item, strlen($kode_item));

    return $tipe.$tahun.$bulan.$kode;
}
function sendMailreg($subjek, $nama_penerima, $email_penerima, $template)
{
    $body = $template;
    // $db   = new Cahkampung\Landadb(Db());
    $config = config('DB');
    $db = new Cahkampung\Landadb($config['db']);
    $mail = new PHPMailer\PHPMailer\PHPMailer();
    $mail->isSMTP();
    $mail->SMTPDebug = 0;
    $mail->SMTPOptions = [
        'ssl' => [
            'verify_peer' => false,
            'verify_peer_name' => false,
            'allow_self_signed' => true,
        ],
    ];
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
//    $mail->Username = "erliomedia@gmail.com";
    // $mail->Password = "bismillah17";
    // $mail->Username = "noreplyinfosystems@gmail.com";
    // $mail->Password = "bismillah2018";
    $mail->Username = 'giromarutori@gmail.com';
    $mail->Password = 'bvojyztqsdpvzpie';
//        $mail->Username = $getEmail->email_smtp;
    //        $mail->Password = $getEmail->password_smtp;
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;
    $mail->setFrom('noreplyinfosystems@gmail.com', 'HUMANIS APP');
    $mail->addAddress($email_penerima, "{$nama_penerima}");
    $mail->isHTML(true);
    $mail->Subject = $subjek;
    $mail->Body = $body;
    // if ($file != false) {
    //     $mail->AddAttachment($file, "laporan-data-nup.pdf");
    // }
    if (!$mail->send()) {
        return [
            'status' => false,
            'error' => $mail->ErrorInfo,
        ];
    }

    return [
        'status' => true,
    ];
}

// Function Hari laporan rkehadiran
function tambahhari($tahun, $bulan, $tanggal)
{
    $tanggalnye = $tahun.'-'.$bulan.'-'.$tanggal;
    $tanggalnye_format = date('Y-m-d', strtotime($tanggalnye));

    return date('l', strtotime($tanggalnye_format));
}
// Function Print_r Die
function pd($params)
{
    print_r($params);

    exit;
}

// Function Echo JSON ENCODE DIE
function ej($params)
{
    echo json_encode($params);

    exit;
}


// generator kode foto


function generate_kode_file()
{
    $dbModel = Db::db();
    $cekKode = $dbModel->select('id')
    ->from('m_petani_foto')
    ->orderBy('id DESC')
    ->find()
    ;

    try {
        if ($cekKode) {
            $kode_terakhir = $cekKode->id;
        } else {
            $kode_terakhir = 0;
        }
        $tipe = 'PT';
        $kode_item = (substr($kode_terakhir, -4) + 1);
        $kode = substr('0000'.$kode_item, strlen($kode_item));
        $kode = $tipe.$kode;

        return [
            'status' => true,
            'data' => $kode,
        ];
    } catch (Exception $e) {
        return [
            'status' => false,
            'error' => 'Gagal Generate Kode',
        ];
    }
}


// function save foto banyak petani

function saveFilePetani($params)
{
    $landa = new Landa();
    if (isset($params['base64']) && !empty($params['base64'])) {
        $path = 'assets/filePetani/';
        $kode =  generate_kode_file();
        $batas = strpos($params['base64'], 'base64,');
        $batas_potong = $batas + 7;
        $file['filename'] = $params['filename'];
        $file['base64'] = substr($params['base64'], $batas_potong);
        $uploadFile = $landa->base64ToFilePath($file, $path, $kode['data']);
        $customnamafile = $uploadFile['data']['fileName'];
        if ($uploadFile['status']) {
            return  $customnamafile;
        }

        return unprocessResponse('gagal', [$uploadFile['error']]);
    }
}

// function save foto banyak tambak





function saveFile($params, $path = 'assets/filePengajuanIzin/', $kode = 'F')
{
    return $params;
        // $landa = new Landa();
        // if (isset($params) && !empty($params)) {
        //      if (!file_exists($path)) {
        //         mkdir($path, 0777, true);
        //     }           
        //     $file['filename'] = isset($params['filename']) ? $params['filename'] : time() . '.jpg';
        //     $file['base64'] = $params;
        //     $uploadFile = $landa->base64ToFilePath($file, $path, $kode);
        //     $customnamafile = $uploadFile['data']['fileName'];
        //     if ($uploadFile['status']) {
        //         return $customnamafile;
        //     }

        //     return unprocessResponse('gagal', [$uploadFile['error']]);
        // }
}

//  get kota 

function getDataKota($id)
{
    $dbModel = Db::db();
    $dbModel->select('*')
    ->from('wilayah_kabupaten')->where('is_deleted', '=', '0');

    if ('0' != $id) {
        $dbModel->andWhere('provinsi_id', '=', $id);
    }

    $models = $dbModel->findAll();
    $totalItem = $dbModel->count();

    return [
        'data' => $models,
        'totalItem' => $totalItem,
    ];
}


function getIdByCode($table, $code, $where = 'kode_form')
{
    $db = Db::db();
    
    $data = $db->select('id')
    ->from($table)
    ->where($where, '=', $code)
    ->find();

    return isset($data->id) ? $data->id : 0;
}


function arrayToString($array, $index = null, $sparator = ',')
{
    $data = [0];
    if (!empty($array)) {
        $data = [];
        foreach ($array as $key => $val) {
            if (!empty($index)) {
                if (!empty($val[$index])) {
                    $data[] = $val[$index];
                }
                 // isset() ? $val[$index] : '';
            } else{
                $data[] = $val;
            }
        }
    }
    $data = implode($sparator, $data);
    
    return $data;
}
function objectToArray($r)
{
  if (is_object($r)) {
    if (method_exists($r, 'toArray')) {
      return $r->toArray(); // returns result directly
  } else {
      $r = get_object_vars($r);
  }
}

if (is_array($r)) {
    $r = array_map(__FUNCTION__, $r); // recursive function call
}

return $r;
}



function createDateRangeArray($strDateFrom,$strDateTo)
{
    // takes two dates formatted as YYYY-MM-DD and creates an
    // inclusive array of the dates between the from and to dates.

    // could test validity of dates here but I'm already doing
    // that in the main script

    $aryRange = [];

    $iDateFrom = mktime(1, 0, 0, substr($strDateFrom, 5, 2), substr($strDateFrom, 8, 2), substr($strDateFrom, 0, 4));
    $iDateTo = mktime(1, 0, 0, substr($strDateTo, 5, 2), substr($strDateTo, 8, 2), substr($strDateTo, 0, 4));

    if ($iDateTo >= $iDateFrom) {
        array_push($aryRange, date('Y-m-d', $iDateFrom)); // first entry
        while ($iDateFrom<$iDateTo) {
            $iDateFrom += 86400; // add 24 hours
            array_push($aryRange, date('Y-m-d', $iDateFrom));
        }
    }
    return $aryRange;
}

function stringToArray($string, $index = null, $sparator = ','){
    $data = [];
    if (!empty($string)) {
        $string = str_replace(' ', '', $string);
        $arr = explode($sparator, $string);

        if (!empty($arr)) {
            foreach ($arr as $key => $val) {
             if (!empty($index)) {
                 $data[$key][$index] = $val;
             } else{
                 $data[] = $val;
             }
         }
     }
 }

 return $data;
}


function createHead($data)
{
    $arr = [];
    if (!empty($data)) {
        foreach ($data as $key => $val) {
            foreach ($val as $k => $v) {
                $arr[$k] = ucwords(str_replace('_', ' ', $k));
            }
        }
    }

    return $arr;
}


