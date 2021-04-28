<?php

use Service\Db;
use Service\Firebase;
use Service\Landa;

// $app->get('/dashboard/getTambak', function ($request, $response) {
//     $params = $request->getParams();
//     $db = Db::db();

//     if (!empty($params['tahun']) && $params['tahun'] != 'undefined') {
//         $tahun = $params['tahun'];
//     } else {
//         $tahun = date('Y');
//     }
//     // ej(date('Y',1609812384));


//     $detail_bawah = $db->select('m_tambak.id,
//                                m_tambak.m_petani_id,
//                                m_tambak.luas,
//                                m_tambak.is_deleted,
//                                m_tambak.status, 
//                                wilayah_kabupaten.nama nama_kabupaten,
//                                wilayah_kabupaten.id as id_wilayah')
//         ->from('m_tambak')
//         ->leftJoin('wilayah_kabupaten', 'm_tambak.kabupaten_id = wilayah_kabupaten.id')
//         ->customWhere("FROM_UNIXTIME(m_tambak.created_at, '%Y') <=" . $tahun, "AND")
//         ->groupBy('m_tambak.kode');

//     $modelz = $detail_bawah->findAll();
//     $arrPerKab = [];
//     $arrTambak = [];
//     $arrpetani = [];
//     $arrLuas = [];
//     foreach ($modelz as $key => $value) {
//         $arrpetani[$value->nama_kabupaten][$value->m_petani_id] = $value->m_petani_id;
//         $arrTambak[$value->nama_kabupaten][$value->id] = $value->id;
//         $arrLuas[$value->nama_kabupaten][$value->luas] = $value->luas;
//         $value->status = $value->is_deleted == 1 ? 'keluar' : $value->status;
//         $arrPerKab[$value->nama_kabupaten] = ['tambak' => count($arrTambak[$value->nama_kabupaten]), 'luas' => array_sum($arrLuas[$value->nama_kabupaten]), 'petani' => count($arrpetani[$value->nama_kabupaten]), 'status' => $value->status, 'kabupaten' => $value->nama_kabupaten, 'id_wilayah' => $value->id_wilayah];
//     }

//     $arrPerKab = array_values($arrPerKab);

//     return successResponse($response, $arrPerKab);


// });


// function getDetail($detail)
// {
//     $data = [
//         'petani' => 0,
//         'tambak' => 0,
//         'tambak_luas' => 0,


//     ];

//     foreach ($detail as $key => $val) {

//         if ($val['status'] == 'anggota' || 'baru') {
//             $data['petani']++;
//             $data['tambak']++;
//             $data['tambak_luas'] += $val['luas'];
//         } else {
//             'data kosong';
//         }
//     }

//     $dataBaru = [];
//     foreach (@$data as $k => $v) {
//         $dataBaru[] = $v;
//     }
//     $return = ['data' => $data, 'dataTotal' => $dataBaru];
//     return $return;
// }

// function getTotal($detail)
// {
//     $data = [

//         'tambak' => 0,
//         'tambak_luas' => 0,

//     ];
//     foreach ($detail as $key => $val) {


//         $data['anggota_luas'] += $val['anggota_luas'];
//         $data['baru'] += $val['baru'];
//         $data['baru_luas'] += $val['baru_luas'];
//         $data['keluar'] += $val['keluar'];
//         $data['keluar_luas'] += $val['keluar_luas'];
//     }
//     // ej($data);exit;

//     return $data;
// }

