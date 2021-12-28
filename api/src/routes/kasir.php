<?php

use Service\Db;

// login auth
$app->post('/kasir/log_in', function ($request, $response) {
    $db = Db::db();
    $params = $request->getParams();
    $username = $params['username'];
    $password = sha1($params['password']);
    $data = $db->select('*')
        ->from('m_user')
        ->where('username', '=', $username)
        ->andwhere('password', '=', $password);
    $model = $data->findAll();

    return successResponse($response, [
        'data' => $model
    ]);
});

// show produk
$app->post('/kasir/produk', function ($request, $response) {
    $db = Db::db();
    $params = $request->getParams();
    $data = $db->select('*')
        ->from('m_barang');
    $model = $data->findAll();

    if($model == null){
        $show = successResponse($response, [
            'message' => 'gagal menampilkan data'
        ]);
    } else{
        $show = successResponse($response, [
            'produk' => $model,
            'message' => 'berhasil'
        ]);
    }

    return $show;
});

// show all transaksi
$app->post('/kasir/transaksi_db', function ($request, $response) {
    $db = Db::db();
    $data = $db->select('*')
        ->from('m_barang');
    $model = $data->findAll();

    if($model == null){
        $show = successResponse($response, [
            'message' => 'gagal menampilkan data'
        ]);
    } else{
        $show = successResponse($response, [
            'data' => $model,
            'message' => 'berhasil'
        ]);
    }

    return $show;
});

// detail transaksi
$app->get('/kasir/transaksi_db/{id}', function ($request, $response) {
    $db = Db::db();
    $id = $request->getAttribute('id');
    $data = $db->select('*')
        ->from('m_barang')
        ->andwhere('id', '=', $id);
    $model = $data->findAll();

    if($model == null){
        $show = successResponse($response, [
            'message' => 'gagal menampilkan data'
        ]);
    } else{
        $show = successResponse($response, [
            'produk' => $model,
            'message' => 'berhasil'
        ]);
    }

    return $show;
});


//$app->post('/kasir/transaksi_db', function ($request, $response) {
//    $db = Db::db();
//    $params = $request->getParams();
//    $id = $params['id'];
//    // 'm_produk.*, m_kategori.nama'
//    $data = $db->select('*')
//        ->from('m_barang')
//        //  ->leftJoin('m_kategori', 'm_produk.m_kategori.id = m_kategori.id')
//        ->andwhere('id', '=', $id);
//    $model = $data->findAll();
//
//    if($model == null){
//        $show = successResponse($response, [
//            'message' => 'gagal menampilkan data'
//        ]);
//    } else{
//        $show = successResponse($response, [
//            'data' => $model,
//            'message' => 'berhasil'
//        ]);
//    }
//
//    return $show;
//});

