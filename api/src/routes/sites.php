<?php

use Model\ApprovalLine;
use Model\Formula;
use Model\HakAkses;
use Service\Db;
use Service\Landa;

$app->get('/tesnotif', function ($request, $response) {
    $params = $request->getParams();
    $approveLine = new ApprovalLine();
    $approveLine->generateDefault($params['id']);
});


$app->get('/site/getListPernyataan', function ($request, $response) {
    $params = $request->getParams();
    $db = Db::db();
    // print_r($params['filter']);die;
    $data = $db->select('*')
        ->from('m_daftar_pernyataan_petani');


    // if($params['m_tambak_id'])

    $models = $data->findAll();
    $tipe = [];
    foreach ($models as $key => $value) {
        $value->is_setuju = false;
        $tipe[$value->tipe][] = (array) $value;


    }

    return successResponse($response, $tipe);
});

// Ambil set sessions
$app->post('/site/setSessions', function ($request, $response) {
    $params = $request->getParams();
        $landa = new Landa();
        $db = Db::db();
        // Ambil data user dari 
       
      
        if (isset($params['email']) && !empty($params['email'])) {
            $data = $db->select('*')
            ->from('m_user')
            ->where('m_user.username' ,'=',$params['email'])
            ->AndWhere('m_user.password','=',sha1($params['password']))
            ->AndWhere('m_user.is_deleted','=', 0)
            ->find();
           if(!empty($data)){
            $_SESSION['user']['nama'] = $data->nama;
            $_SESSION['user']['id'] = $data->id;
            $_SESSION['user']['akses'] =json_decode($data->akses);
            return successResponse($response, ['user' => $_SESSION['user']]);
           }
        }

    // }
 

    return unprocessResponse($response, ['User Tidak Ditemukan']);
})->setName('setSession');


// Ambil session user
$app->get('/site/session', function ($request, $response) {
    if (isset($_SESSION['user']['id'])) {
        return successResponse($response, $_SESSION['user']);
    }

    return unprocessResponse($response, ['undefined']);
})->setName('session');


// Hapus semua session
$app->get('/site/logout', function ($request, $response) {
    // $firebase = new Firebase();
    $landa = new Landa();

    // if (isset($_SESSION['user']['registrationToken']) && !empty($_SESSION['user']['registrationToken'])) {
    //     if (isset($_SESSION['user']['karyawan_perusahaan']) && [] != $_SESSION['user']['karyawan_perusahaan']) {
    //         $users = json_decode($_SESSION['user']['karyawan_perusahaan']);
    //         foreach ($users as $key => $val) {
    //             $topic = $firebase->unsubscribeTopic($_SESSION['user']['registrationToken'], $landa->idKaryawan($val->id, $_SESSION['user']['client']));
    //         }
    //     }
    //     // $topic = $firebase->unsubscribeTopic($_SESSION['user']['registrationToken'], $landa->idKaryawan($_SESSION['user']['userId'], $_SESSION['user']['client']));
    //     $topic = $firebase->unsubscribeTopic($_SESSION['user']['registrationToken'], 'all_'.$_SESSION['user']['client']);
    // }
    session_destroy();
    return successResponse($response, []);
})->setName('logout');







