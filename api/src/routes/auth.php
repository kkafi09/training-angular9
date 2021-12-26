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

    for ($x = 0; $x < count($data); $x++) {
        if ($data[$x]['nama'] === $username && $data[$x]['password'] === $password) {
            $id = $data[$x]['id'];
            $nama = $data[$x]['nama'];
            $pass = $data[$x]['password'];

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
        }
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

    if ($password == $confirmpass) {
        if ($nama != null && $email != null && $no != null && $alamat == null) {
            $sukses = successResponse($response, [
                'nama' => $data2[count($data2) - 1]['nama'],
                'email' => $data2[count($data2) - 1]['email'],
                'no-telp' => $data2[count($data2) - 1]['no'],
                'password' => $data2[count($data2) - 1]['password'],
                'confirm-pass' => $data2[count($data2) - 1]['confirmpass'],
                'massage' => 'Berhasil!!!'
            ]);
        } elseif ($email != null && $no == null) {
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

    for ($i = 0; $i< count($data3); $i++){
        if ($data3[$i]['email'] == $forgot || $data3[$i]['telp'] == $forgot){
            $result = [
                'nama' => $data3[$i]['nama'],
                'email' => $data3[$i]['email'],
                'telp' => $data3[$i]['telp']
            ];
        } else{
            $error = 'error message';
        }
    }

    global $result;
    if ($result == null){
        $sukses = successResponse($response,[
            'email'=> null,
            'message'=> "email atau telpon tidak terdaftar"
        ]);
    } else{
        $sukses = successResponse($response,[
            'email'=> $result,
            'message'=> "berhasil, silahkan cek email anda"
        ]);
    }

    return $sukses;
});

//// ROUTE FORGOT
//
//$app->post('/auth/lupaku', function($request2, $response2){
//
//    $ggaming = [
//        array(
//            'id'=>1,
//            'nama'=>'joni',
//            'email'=>'joni@example.com',
//            'telp'=>'081234',
//            'password'=>'joni_ganteng'
//        ),
//        array(
//            'id'=>2,
//            'nama'=>'bella',
//            'email'=>'bela@example.com',
//            'telp'=>'08585',
//            'password'=>'bela_cantik'
//        ),
//        array(
//            'id'=>3,
//            'nama'=>'asep',
//            'email'=>'asep@example.com',
//            'telp'=>'08476',
//            'password'=>'asep_cakep'
//        )
//    ];
//
//    $input = $request2->getParsedBody();
//    $lupa = trim(strip_tags($input['lupa']));
//
//    for($b = 0; $b < count($ggaming); $b++){
//        if($ggaming[$b][email] == $lupa || $ggaming[$b][telp] == $lupa){
//            $hasil_data = ['nama' => $ggaming[$b][nama],'email' => $ggaming[$b][email],'telp' => $ggaming[$b][telp]];
//        }else{
//            $coba2 = 'eror';
//        }
//    }
//    if($hasil_data == null){
//        $jaya = successResponse($response2,[
//            'email'=> null,
//            'message'=> "email/telp tidak terdaftar"
//        ]);
//    }else{
//        $jaya = successResponse($response2,[
//            'email' => $hasil_data,
//            'message'=>"berhasil, silahkan cek email anda"
//        ]);
//    }
//    return $jaya;
//});

