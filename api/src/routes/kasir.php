<?php

use Service\Db;

// login auth
$app->post('/kasir/log_in', function ($request, $response) {
    $db = Db::db();
    $params = $request->getParsedBody();
    $username = $params['username'];
    $password = sha1($params['password']);
    $data = $db->select('*')
        ->from('m_user')
        ->where('password', '=', $password)
        ->customWhere("username = '{$username}' OR email = '{$username}'");
    $model = $data->findAll();

    $delete = $db->select('*')
        ->from('m_user')
        ->where('is_deleted', '=', 1);
    $modelDelete = $delete->findAll();

    if ($model != null && $modelDelete != $model) {
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
        ->where('password','=',$password);
    $getPass = $data->findAll();

    if (count($getPass) == 0) {
        return true;
    } else {
        return false;
    }
}

function confPassCheck($pass, $confirmpass): bool
{
    if ($pass != $confirmpass) {
        return true;
    }
    return false;
}

function confirmPassUpdate($pass, $confirmpass): bool
{
    if ($pass == $confirmpass) {
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
        "password" => sha1($input["password"]),
    ];

    if (userCheck($input['username'])) {
        $pesanUser = "username sudah dipakai orang lain, ";
    }
    if (confPassCheck($input['password'], $input['confirmpassword'])) {
        $pesanPass = "password dan confirm tidak sama, ";
    }
    if (emailCheck($input['email'])) {
        $pesanEmail = "email sudah ada, ";
    }

    if ($pesanPass == null && $pesanEmail == null && $pesanUser == null) {
        $pesanSukses = "berhasil mendaftar silahkan login";
        $db->insert('m_user', $value);
    }

    $pesan = "$pesanUser $pesanEmail $pesanPass $pesanSukses";
    $resStr = str_replace(", , ", ", ", substr($pesan, 0, strlen($pesan)));

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
        "password" => sha1($input["passwordbaru"]),
    ];

    $data = $db->select('*')
        ->from('m_user')
        ->where('id', '=', $value['id']);
    $model = $data->findAll();

    if ($model == null) {
        return successResponse($response, [
            'message' => "data user tidak ditemukan"
        ]);
    }

//    if (!passCheck($input['passwordlama'])) {
//        return successResponse($response, [
//            'data' => $model,
//            'data pw' => sha1($input['passwordlama']),
//            'data id' => $input['id'],
//            'message' => "gagal mengupdate data, password lama tidak sesuai"
//        ]);
//    }

    if (emailCheck($input['email'])) {
        return successResponse($response, [
            'message' => "gagal mengupdate data, email sudah ada"
        ]);
    }

    if ($input['passwordlama'] == null || $input['passwordbaru'] == null && $input['confirmpass'] == null) {
        $value = [
            "id" => $input["id"],
            "nama" => $input["nama"],
            "email" => $input["email"],
            "alamat" => $input["alamat"],
            "telepon" => $input["telepon"],
        ];
//        $db->update('m_user', $value, ["id" => $input["id"]]);
        return successResponse($response, [
            'message' => "data berhasil di update, tanpa ganti password"
        ]);
    }

    if (confirmPassUpdate($input['passwordbaru'], $input['confirmpass'] && passCheck($input['passwordlama']))) {
//        $db->update('m_user', $value, ["id" => $input["id"]]);
        return successResponse($response, [
            'message' => "semua data, berhasil di update"
        ]);
    } else {
        return successResponse($response, [
            'message' => "password baru dan confirm password tidak sama"
        ]);
    }
});

// forgot
$app->post('/kasir/forgot', function ($request, $response) {
    $db = Db::db();
    $input = $request->getParsedBody();

    $forgot = $input['forgot'];
    $data = $db->select('*')
        ->from('m_user')
        ->where('email', '=', $forgot)
        ->orwhere('telepon', '=', $forgot);
    $model = $data->findAll();

    $username = $db->select('username')
        ->from('m_user')
        ->where('email', '=', $forgot)
        ->orwhere('telepon', '=', $forgot);
    $modelUsername = $username->find();

    $newUsername = sha1($modelUsername->username);

    if ($model != null) {
        $db->update('m_user', ['password' => $newUsername], ["email" => $input['forgot']]);
        $db->update('m_user', ['password' => $newUsername], ["telepon" => $input['forgot']]);
        return successResponse($response, [
            'data' => $modelUsername->username,
            'message' => "sukses update password dengan username anda"
        ]);
    } else {
        return successResponse($response, [
            'data' => $model,
            'message' => "data user tidak ditemukan"
        ]);
    }
});


$app->post('/kasir/delete', function ($request, $response) {
    $db = Db::db();
    $input = $request->getParsedBody();
    $id = $input['id'];
    $data = $db->select('*')
        ->from('m_user')
        ->where('id', '=', $id);
    $model = $data->findAll();

    $value = [
        "is_deleted" => 1,
    ];

    if ($model != null) {
        $db->update('m_user', $value, ["id" => $input["id"]]);
        return successResponse($response, [
            'message' => "data berhasil dihapus"
        ]);
    } else {
        return successResponse($response, [
            'message' => "data gagal dihapus"
        ]);
    }
});

// produk with relation
$app->post('/kasir/produk', function ($request, $response) {
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

