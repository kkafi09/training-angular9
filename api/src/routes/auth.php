<?php

$app->post('/auth/login', function ($request, $response) {
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


    $input = $request->getParsedBody();

    $username = trim(strip_tags($input['nama']));

    $password = trim(strip_tags($input['password']));


    for ($x = 0; $x < count($data); $x++) {
        if ($data[$x][nama] == $username && $data[$x][password] == $password) {
            $id = $data[$x][id];
            $nama = $data[$x][nama];
            $pass = $data[$x][password];
        } else {
            $coba2 = 'eror';
        }
    }


    if ($id == null) {
        $sukses = successResponse($response, [
            'id' => $id,
            'massage' => 'Gagal!!!'
        ]);
    } else {
        $sukses = successResponse($response, [
            'id' => $id,
            'nama' => $nama,
            'password' => $pass,
            'massage' => 'Berhasil!!!'
        ]);
    }


    $params = $request->getParams();
    return $sukses;
});
