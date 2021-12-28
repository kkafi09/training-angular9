<?php

$data = [
    [
        'id' => '1',
        'nama' => 'joni',
        'password' => 'joni_ganteng'
    ],
    [
        'id' => '2',
        'nama' => 'bela',
        'password' => 'bela_cantik'
    ],
    [
        'id' => '3',
        'nama' => 'andi',
        'password' => 'andi_cakep'
    ]
];

$app->post('/auth/login', function ($request, $response) {

    global $data;
    $input = $request->getParsedBody();

    $username = trim(strip_tags($input['nama']));
    $password = trim(strip_tags($input['password']));
    $id = null;

    for ($x = 0; $x < count($data); $x++) {
        if ($data[$x]['nama'] === $username && $data[$x]['password'] === $password) {
            $id = $data[$x]['id'];
            $nama = $data[$x]['nama'];
            $pass = $data[$x]['password'];
        }
    }

    if ($id != null) {
        $sukses = successResponse($response, [
            'id' => $id,
            'nama' => $nama,
            'password' => $pass,
            'massage' => 'Berhasil!!!'
        ]);
    } else {
        $sukses = successResponse($response, [
            'user' => $id,
            'massage' => 'Username dan password tidak sesuai'
        ]);
    }

    return $sukses;
});


$data2 = [
    [
        'id' => 1,
        'nama' => 'kafi',
        'email' => 'kafi@gmail.com',
        'alamat' => 'Kediri',
        'no' => '085123456',
        'password' => 'rahasia',
        'confirmpass' => 'rahasia'
    ]
];

$app->post('/auth/register', function ($request, $response) {
    global $data2;
    $input = $request->getParsedBody();

    // nama, email, alamat, no telp, password, confirm pass
    $nama = trim(strip_tags($input['nama']));
    $email = trim(strip_tags($input['email']));
    $alamat = trim(strip_tags($input['alamat']));
    $no = trim(strip_tags($input['no']));
    $password = trim(strip_tags($input['password']));
    $confirmpass = trim(strip_tags($input['confirmpass']));

    $newdata = [
        'nama' => $nama,
        'email' => $email,
        'alamat' => $alamat,
        'no' => $no,
        'password' => $password,
        'confirmpass' => $confirmpass
    ];

    array_push($data2, $newdata);

    if ($password == $confirmpass && $nama != null && $email != null) {
        if ($no != null && $alamat == null) {
            $sukses = successResponse($response, [
                'nama' => $data2[count($data2) - 1]['nama'],
                'email' => $data2[count($data2) - 1]['email'],
                'no-telp' => $data2[count($data2) - 1]['no'],
                'password' => $data2[count($data2) - 1]['password'],
                'confirm-pass' => $data2[count($data2) - 1]['confirmpass'],
                'massage' => 'Berhasil!!!'
            ]);
        } elseif ($alamat != null && $no == null) {
            $sukses = successResponse($response, [
                'nama' => $data2[count($data2) - 1]['nama'],
                'email' => $data2[count($data2) - 1]['email'],
                'alamat' => $data2[count($data2) - 1]['alamat'],
                'password' => $data2[count($data2) - 1]['password'],
                'confirm-pass' => $data2[count($data2) - 1]['confirmpass'],
                'massage' => 'Berhasil!!!'
            ]);
        } else {
            $sukses = successResponse($response, [
                'nama' => $data2[count($data2) - 1]['nama'],
                'email' => $data2[count($data2) - 1]['email'],
                'no-telp' => $data2[count($data2) - 1]['no'],
                'alamat' => $data2[count($data2) - 1]['alamat'],
                'password' => $data2[count($data2) - 1]['password'],
                'confirm-pass' => $data2[count($data2) - 1]['confirmpass'],
                'massage' => 'Berhasil!!!'
            ]);
        }
    } else {
        $sukses = successResponse($response, [
            'user' => $nama,
            'massage' => 'Gagal Daftar'
        ]);
    }

    return $sukses;
});

$data3 = [
    [
        'id' => 1,
        'nama' => 'joni',
        'email' => 'joni@example.com',
        'telp' => '081234',
        'password' => 'joni_ganteng'
    ],
    [
        'id' => 2,
        'nama' => 'bella',
        'email' => 'bela@example.com',
        'telp' => '08585',
        'password' => 'bela_cantik'
    ],
    [
        'id' => 3,
        'nama' => 'asep',
        'email' => 'asep@example.com',
        'telp' => '08476',
        'password' => 'asep_cakep'
    ]
];

$app->post('/auth/forgot', function ($request, $response) {
    global $data3;
    $input = $request->getParsedBody();

    $forgot = trim(strip_tags($input['forgot']));
    $hasil_data = null;

    for ($i = 0; $i < count($data3); $i++) {
        if ($data3[$i]['email'] == $forgot || $data3[$i]['telp'] == $forgot) {
            $hasil_data = [
                'nama' => $data3[$i]['nama'],
                'email' => $data3[$i]['email'],
                'telp' => $data3[$i]['telp']
            ];
        } else {
            $error = 'null';
        }
    }

    if ($hasil_data === null) {
        $sukses = successResponse($response, [
            'email' => $hasil_data,
            'message' => "email atau telpon tidak terdaftar"
        ]);
    } else {
        $sukses = successResponse($response, [
            'email' => $hasil_data,
            'message' => "berhasil, silahkan cek email anda"
        ]);
    }

    return $sukses;
});

$app->post('/auth/update-profile', function ($request, $response) {
    $input = $request->getParsedBody();
    global $data3;

    $nama = trim(strip_tags($input['nama']));
    $email = trim(strip_tags($input['email']));
    $alamat = trim(strip_tags($input['alamat']));
    $no = trim(strip_tags($input['no']));
    $hasil_data = null;

    for ($i = 0; $i < count($data3); $i++) {
        if ($data3[$i]['email'] == $email || $data3[$i]['nama'] == $nama) {
            $data3[$i]['nama'] = $nama;
            $data3[$i]['email'] = $email;
            $data3[$i]['alamat'] = $alamat;
            $data3[$i]['no'] = $no;

            $hasil_data = [
                'nama' => $data3[$i]['nama'],
                'email' => $data3[$i]['email'],
                'alamat' => $data3[$i]['alamat'],
                'telp' => $data3[$i]['telp']
            ];
        }
    }

    if ($hasil_data == null) {
        $sukses = successResponse($response, [
            'data' => null,
            'message' => "gagal update data"
        ]);
    } else {
        $sukses = successResponse($response, [
            'data' => $hasil_data,
            'message' => "berhasil update data"
        ]);
    }

    return $sukses;
});

$data4 = [
    [
        'id' => 1,
        'kasir' => 'joni',
        'customer' => 'member',
        'nominal' => '25000',
    ],
    [
        'id' => 3,
        'kasir' => 'joni',
        'customer' => 'member',
        'nominal' => '50000',
    ],
    [
        'id' => 5,
        'kasir' => 'joni',
        'customer' => 'member',
        'nominal' => '25000',
    ],
];

$app->post('/auth/transaksi', function ($request, $response) {
    global $data4;
    $hasil_data = [];

    for ($i = 0; $i < count($data4); $i++) {
        array_push($hasil_data, [
            'id' => $data4[$i]['id'],
            'kasir' => $data4[$i]['kasir'],
            'customer' => $data4[$i]['customer'],
            'nominal' => $data4[$i]['nominal'],
        ]);
    }

    return successResponse($response, [
        $hasil_data,
        'message' => 'data transaksi'
    ]);
});

$app->get('/auth/transaksi/id/{id}', function ($request, $response) {
    global $data4;
    $input = $request->getAttribute('id');
    $hasil = null;

    for ($i = 0; $i < count($data4); $i++){
        if ($input == $data4[$i]['id']){
            $hasil = [
                'id' => $data4[$i]['id'],
                'kasir' => $data4[$i]['kasir'],
                'customer' => $data4[$i]['customer'],
                'nominal' => $data4[$i]['nominal'],
            ];
        }
    }

    if ($hasil == null) {
        $sukses = successResponse($response, [
            'data' => null,
            'message' => "salah memasukkan id"
        ]);
    } else {
        $sukses = successResponse($response, [
            'data' => $hasil,
            'message' => "detail transaksi"
        ]);
    }

    return $sukses;
});
