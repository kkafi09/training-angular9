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
        ->orwhere('email', '=', $username)
        ->andwhere('password', '=', $password);
    $model = $data->findAll();

    if ($model != null) {
        return successResponse($response, [
            'data' => $model,
            'message' => "sukses login"
        ]);
    } else {
        return successResponse($response, [
            'message' => "gagal login"
        ]);
    }
});

function userCheck($username): bool
{
    $db = Db::db();
    $data = $db->select('*')
        ->from('m_user')
        ->where('username', '=', $username);
    $model = $data->findAll();

    if ($model != null) {
        return true;
    }
    return false;
}

function emailCheck($email): bool
{
    $db = Db::db();
    $data = $db->select('*')
        ->from('m_user')
        ->where('email', '=', $email);
    $model = $data->findAll();

    if ($model != null) {
        return true;
    }
    return false;
}

function passCheck($password): bool
{
    $db = Db::db();
    $data = $db->select('*')
        ->from('m_user')
        ->where('password', '=', $password);
    $model = $data->findAll();

    if ($model != null) {
        return true;
    }
    return false;
}

function confPassCheck($pass, $confirmpass): bool
{
    if ($pass != $confirmpass) {
        return true;
    }
    return false;
}

// register
$app->post('/kasir/register', function ($request, $response) {
    $db = Db::db();
    $input = $request->getParsedBody();
    $pesan = null;
    $pesanUser = null;
    $pesanPass = null;
    $pesanEmail = null;
    $pesanSukses = null;
    $value = [
        "nama" => $input["nama"],
        "email" => $input["email"],
        "jenis_kelamin" => $input["jeniskelamin"],
        "alamat" => $input["alamat"],
        "telepon" => $input["telepon"],
        "username" => $input["username"],
        "password" => $input["password"],
    ];
    if (userCheck($input['username'])) {
        $pesanUser = "username sudah dipakai orang lain";
    }
    if (confPassCheck($input['password'], $input['confirmpassword'])) {
        $pesanPass = "password tidak sama";
    }
    if (emailCheck($input['email'])) {
        $pesanEmail = "email sudah ada";
    }
    if ($pesanPass == null && $pesanEmail == null && $pesanUser == null) {
        $pesanSukses = "berhasil mendaftar silahkan login";
//        $db->insert('m_user', $value);
    }

    $pesan = "$pesanUser, $pesanEmail, $pesanPass, $pesanSukses";
    $resStr = str_replace(", ,", ", ", substr($pesan, 0, -2));

    return successResponse($response, [
        'message' => $resStr
    ]);
});

// update profile
$app->post('/kasir/update_profile', function ($request, $response) {
    $db = Db::db();
    $input = $request->getParsedBody();
    $value = [
        "id" => $input["id"],
        "nama" => $input["nama"],
        "email" => $input["email"],
        "alamat" => $input["alamat"],
        "telepon" => $input["telepon"],
        "password" => $input["password baru"],
    ];

    if ($input["id"] == null){
        return successResponse($response, [
            'message' => "data user tidak ditemukan"
        ]);
    }

    if($input['password lama'] == null || $input['password baru'] == null || $input['confirm pass'] == null){
        $value = [
            "id" => $input["id"],
            "nama" => $input["nama"],
            "email" => $input["email"],
            "alamat" => $input["alamat"],
            "telepon" => $input["telepon"],
        ];
        return successResponse($response, [
            'message' => "data user tanpa password"
        ]);
    }

    return successResponse($response, [
        'message' => "data masuk semua"
    ]);
});

// produk with relation
$app->post('/kasir/produkRelasi', function ($request, $response) {
    $db = Db::db();
    $params = $request->getParams();
    $data = $db->select('m_produk.*, m_kategori.nama')
        ->from('m_produk')
        ->innerJoin('m_kategori', 'm_produk.id_kategori=m_kategori.id');
    $model = $data->findAll();

    if ($model == null) {
        $show = successResponse($response, [
            'message' => 'gagal menampilkan data'
        ]);
    } else {
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
    $data = $db->select('m_transaksi.*, c_user.nama')
        ->from('m_transaksi')
        ->innerJoin('c_user', 'm_transaksi.id_user=c_user.id_user');
    $model = $data->findAll();

    if ($model == null) {
        $show = successResponse($response, [
            'message' => 'gagal menampilkan data'
        ]);
    } else {
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
    $data = $db->select('trans_det.*, m_produk.*, trans_det.qty * (m_produk.harga - m_produk.diskon) as total')
        ->from('trans_det')
        ->innerJoin('m_produk', 'trans_det.id_produk=m_produk.id_produk')
        ->andwhere('id_kategori', '=', $id);
    $model = $data->findAll();

    if ($model == null) {
        $show = successResponse($response, [
            'message' => 'gagal menampilkan data'
        ]);
    } else {
        $show = successResponse($response, [
            'produk' => $model,
            'message' => 'berhasil'
        ]);
    }

    return $show;
});

