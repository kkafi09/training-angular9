<?php

namespace Service;

use Google\Cloud\Firestore\FirestoreClient;
use Kreait\Firebase\Factory;
use Kreait\Firebase\Messaging\CloudMessage;

/**
 * Class Firebase digunakan untuk service ke firebase.
 */
class Firebase
{
    protected $fdb; // inisialisasi firestore firebase

    protected $name; //inisialisasi collection

    private $fb; //inisialisasi koneksi firebase

    private $firestore; //inisialisasi firebase sdk

    private $auth; //inisialisasi firebase sdk

    private $messaging; //inisialisasi firebase sdk

    public function __construct()
    {
        $this->fb = (new Factory())->withServiceAccount('config/humanis-2020-firebase-adminsdk-5glk8-1e47a8e2a2.json');
        $this->firestore = $this->fb->createFirestore();
        $this->auth = $this->fb->createAuth();
        $this->messaging = $this->fb->createMessaging();
        $this->fdb = new FirestoreClient([
            'projectId' => 'humanis-2020',
        ]);
    }

    /**
     * [sendNotif description].
     *
     * @param [type] $type    [description]
     * @param [type] $title   [description]
     * @param [type] $message [description]
     * @param array  $data    [description]
     *
     * @return [type] [description]
     */
    public function sendNotif($type, $title, $message, $data = [])
    {
        if ('all' == $type) {
            $message = CloudMessage::withTarget('topic', 'all')
                ->withNotification([
                    'title' => $title,
                    'body' => $message,
                    'image' => 'https://app.humanis.id/assets/icons/icon-128x128.png',
                    'notification_priority' => 'PRIORITY_HIGH',
                ])
                ->withData($data) // optional
            ;
        } elseif ('company' == $type) {
            $message = CloudMessage::withTarget('topic', 'all_'.$_SESSION['user']['client'])
                ->withNotification([
                    'title' => $title,
                    'body' => $message,
                    'image' => 'https://app.humanis.id/assets/icons/icon-128x128.png',
                    'notification_priority' => 'PRIORITY_HIGH',
                ])
                ->withData($data) // optional
            ;
        } elseif ('person' == $type) {
            $message = CloudMessage::withTarget('topic', $data['idKaryawan'])
                ->withNotification([
                    'title' => $title,
                    'body' => $message,
                    'image' => 'https://app.humanis.id/assets/icons/icon-128x128.png',
                    'notification_priority' => 'PRIORITY_HIGH',
                ])
                ->withData($data)// optional
            ;
        }

        try {
            $send = $this->messaging->send($message);

            return true;
        } catch (Exception $e) {
            return false;
        }
    }

    public function firebaseAuth($email, $password)
    {
        $user = $this->auth->createUserWithEmailAndPassword($email, $password);
        $ambil = $this->auth->getUserByEmail($email);

        return [
            'data' => $ambil,
        ];
    }

    public function getFirebaseAuth($email)
    {
        $ambil = $this->auth->getUserByEmail($email);

        return [
            'data' => $ambil,
        ];
    }

    public function firebaseupdateAuth($uid, $email)
    {
        $update = $this->auth->changeUserEmail($uid, $email);

        return [
            'data' => $update,
        ];
    }

    public function subscribeTopic($token, $topik)
    {
        try {
            $subscribe = $this->messaging->subscribeToTopic($topik, $token);

            return [
                'status' => true,
                'data' => $subscribe,
            ];
        } catch (Exception $e) {
            return [
                'status' => false,
                'error' => $e->getMessage(),
            ];
        }
    }

    public function unsubscribeTopic($token, $topik)
    {
        try {
            $unSubscribe = $this->messaging->unsubscribeFromTopic($topik, $token);

            return [
                'status' => true,
                'data' => $unSubscribe,
            ];
        } catch (Exception $e) {
            return [
                'status' => false,
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Ambil detail user berdasarkan email.
     *
     * @return [array]
     */
    public function getUserByEmail(string $email)
    {
        try {
            //  $collection = $this->firestore->database()->collection('presensi');
            // $query = $collection->select(['id_client', 'id_karyawan', 'id_perusahaan', 'latitude', 'longitude', 'tgl_checklock', 'jam_checklock'])->where('tgl_checklock', '>=', $params['tgl_mulai'])->where('tgl_checklock', '<=', $params['tgl_selesai']);
            // $presensi = $query->documents();

            $collection = $this->firestore->database()->collection('users');
            $query = $collection->where('email', '=', $email);
            $data = $query->documents();
            $user = [];
            foreach ($data as $key => $value) {
                $user = $value;
            }

            return [
                'status' => true,
                'data' => $user,
            ];
        } catch (Exception $e) {
            return [
                'status' => false,
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * delete user authentication berdasarkan email.
     *
     * @return [array]
     */
    public function deleteAuthByUid(string $uid)
    {
        try {
            $deleteauth = $this->auth->deleteUser($uid);

            return [
                'status' => true,
                'data' => $user,
            ];
        } catch (Exception $e) {
            return [
                'status' => false,
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Ambil detail user berdasarkan uid.
     *
     * @return [array]
     */
    public function getUserByUid(string $uid)
    {
        try {
            $user = $this->firestore->database()->collection('users')->document($uid)->snapshot();

            return [
                'status' => true,
                'data' => $user,
            ];
        } catch (Exception $e) {
            return [
                'status' => false,
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Ambil detail client berdasarkan uid.
     *
     * @return [array]
     */
    public function getClientByUid(string $uid)
    {
        try {
            $client = $this->firestore->database()->collection('client')->document($uid)->snapshot();

            return [
                'status' => true,
                'data' => $client,
            ];
        } catch (Exception $e) {
            return [
                'status' => false,
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Ambil Semua klien.
     *
     * @return [array]
     */
    public function getAllClient()
    {
        try {
            $client = $this->firestore->database()->collection('client')->where('is_deleted', '=', false)->documents();
            $arr = [];
            $landa = new Landa();
            foreach ($client as $key => $value) {
                $data = $value->data();
                $arr[$key]['nama'] = $data['nama'];
                $arr[$key]['cp'] = $data['cp'];
                $arr[$key]['email'] = $data['email'];
                $arr[$key]['telepon'] = $data['telepon'];
                $arr[$key]['uid'] = $data['uid'];
                $arr[$key]['db'] = [
                    'DB_HOST' => isset($data['db']['DB_HOST']) ? $landa->unsafeString($data['db']['DB_HOST']) : '',
                    'DB_NAME' => isset($data['db']['DB_NAME']) ? $landa->unsafeString($data['db']['DB_NAME']) : '',
                    'DB_PASS' => isset($data['db']['DB_PASS']) ? $landa->unsafeString($data['db']['DB_PASS']) : '',
                    'DB_USER' => isset($data['db']['DB_USER']) ? $landa->unsafeString($data['db']['DB_USER']) : '',
                ];
            }

            return [
                'status' => true,
                'data' => $arr,
            ];
        } catch (Exception $e) {
            return [
                'status' => false,
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Create new document with data.
     *
     * @return bool|string
     */
    public function newDocument(string $collection, string $uid, array $data = [])
    {
        try {
            if (empty($uid)) {
                $this->fdb->collection($collection)->add($data);
            } else {
                $this->fdb->collection($collection)->document($uid)->create($data);
            }

            return true;
        } catch (Exception $exception) {
            return $exception->getMessage();
        }
    }

    /**
     * Update document with data.
     *
     * @param string $name
     *
     * @return bool|string
     */
    public function updateDocument(string $collection, string $uid, array $data = [])
    {
        try {
            $updateDoc = $this->fdb->collection($collection)->document($uid);
            $arr = [];
            foreach ($data as $key => $value) {
                $arr[] = ['path' => $key, 'value' => $value];
            }
            if (!empty($arr)) {
                $updateDoc->update($arr);
            }

            return true;
        } catch (Exception $exception) {
            return $exception->getMessage();
        }
    }

    /**
     * Drop exists document in collection.
     */
    public function dropDocument(string $name)
    {
        $this->db->collection($collection)->document($name)->delete();
    }

    /**
     * @param string|Uid               $uid
     * @param ClearTextPassword|string $newPassword
     *
     * @throws Exception\AuthException
     * @throws Exception\FirebaseException
     */
    public function changePassword($uid, $newPassword)
    {
        $update = $this->auth->changeUserPassword($uid, $newPassword);

        return [
            'data' => $update,
        ];
    }

    /**
     * Ambil Semua Presensi.
     *
     * @param mixed $idclient
     * @param mixed $params
     * @param mixed $pagination
     *
     * @return [array]
     */
    public function getAllPresensi($params, $idclient, $pagination)
    {
        // pd($idclient);
        try {
            // Filter
            if (isset($params) && !is_array($params)) {
                // jika parameter dalam bentuk json
                $filter = (isset($params)) ? (array) json_decode($params) : [];
            } elseif (isset($params) && is_array($params)) {
                $filter = $params;
            }
            // pd($pagination);

            // ABAIKAN DULU
            //Kondisi Ketika ada filter idkaryawan dan filter periode
            if (!empty($filter['id_karyawan']) && !empty($filter['tgl_mulai'])) {
                $tgl_mulaii = date('d-m-Y', strtotime($filter['tgl_mulai']));
                $tgl_selesaii = date('d-m-Y', strtotime($filter['tgl_selesai']));
                $set_mulai = strtotime($tgl_mulaii);
                $set_selesai = strtotime($tgl_selesaii);

                // pd("Hola");
                $presensi = $this->firestore->database()->collection('presensi')->where('id_client', '=', $idclient)->where('id_karyawan', '=', $filter['id_karyawan'])->where('tgl_checklock', '>=', $set_mulai)->where('tgl_checklock', '<=', $set_selesai)->documents();
            }

            //Kondisi Ketika hanya ada filter periode
            if (!empty($filter['tgl_mulai']) && empty($filter['id_karyawan'])) {
                $tgl_mulaii = date('d-m-Y', strtotime($filter['tgl_mulai']));
                $tgl_selesaii = date('d-m-Y', strtotime($filter['tgl_selesai']));
                $set_mulai = strtotime($tgl_mulaii);
                $set_selesai = strtotime($tgl_selesaii);

                $presensi = $this->firestore->database()->collection('presensi')->where('id_client', '=', $idclient)->where('tgl_checklock', '>=', $set_mulai)->where('tgl_checklock', '<=', $set_selesai)->documents();
            }
            // END OF ABAIKAN DULU

            // pd($filter);
            //Kondisi Ketika ada filter idkaryawan saja
            if (!empty($filter['id_karyawan']) && empty($filter['tgl_mulai'])) {
                // pd('yuuu');
                // $id_karyawannya = $filter['id_karyawan'];

                $presensi = $this->firestore->database()->collection('presensi')->where('id_client', '=', $idclient)->where('id_karyawan', '=', $filter['id_karyawan'])->where('id_perusahaan', '=', $_SESSION['user']['m_perusahaan']['id'])->documents();
            }

            //Kondisi Ketika tidak ada filter
            if (empty($filter['id_karyawan']) && empty($filter['tgl_mulai'])) {
                // pd('qwe');
                // pd($_SESSION['user']['m_perusahaan']['id']);
                $presensi = $this->firestore->database()->collection('presensi')->where('id_client', '=', $idclient)->where('id_perusahaan', '=', $_SESSION['user']['m_perusahaan']['id'])->documents();
            }
            // pd($presensi);
            $arr = [];
            $landa = new Landa();
            foreach ($presensi as $key => $value) {
                $data = $value->data();
                $arr[$key]['foto'] = $data['foto'];
                $arr[$key]['id_client'] = $data['id_client'];
                $arr[$key]['id_karyawan'] = $data['id_karyawan'];
                $arr[$key]['latitude'] = $data['latitude'];
                $arr[$key]['longitude'] = $data['longitude'];
                $arr[$key]['time'] = date('d-M-Y H:i', strtotime($data['time']));
                $arr[$key]['tgl_checklock'] = date('d/m/Y', $data['tgl_checklock']);
                $arr[$key]['jam'] = isset($data['jam_checklock']) ? $data['jam_checklock'] : 0;
                $arr[$key]['uid'] = isset($data['uid']) ? $data['uid'] : '';
            }

            $keys = array_column($arr, 'jam');
            array_multisort($keys, SORT_DESC, $arr);

            // pd($arr);
            return [
                'status' => true,
                'data' => $arr,
            ];
        } catch (Exception $e) {
            return [
                'status' => false,
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Ambil Semua Presensi.
     *
     * @param mixed $idclient
     * @param mixed $params
     *
     * @return [array]
     */
    public function getAllAbsensi($params = [])
    {
        // pd($params);
        try {
            $collection = $this->firestore->database()->collection('presensi');
            $query = $collection->select(['id_client', 'id_karyawan', 'id_perusahaan', 'latitude', 'longitude', 'tgl_checklock', 'jam_checklock'])->where('tgl_checklock', '>=', $params['tgl_mulai'])->where('tgl_checklock', '<=', $params['tgl_selesai']);
            $presensi = $query->documents();

            // $presensi = $this->firestore->database()->collection('presensi')->where('tgl_checklock', '>=', $params['tgl_mulai'])->where('tgl_checklock', '<=', $params['tgl_selesai'])->documents();
            $arr = [];
            $landa = new Landa();
            foreach ($presensi as $key => $value) {
                $data = $value->data();
                $arr[$key]['id_client'] = $data['id_client'];
                $arr[$key]['karyawan_id'] = $data['id_karyawan'];
                $arr[$key]['latitude'] = $data['latitude'];
                $arr[$key]['longitude'] = $data['longitude'];
                $arr[$key]['tgl'] = date('Y-m-d', $data['tgl_checklock']);
                $arr[$key]['jam'] = isset($data['jam_checklock']) ? $data['jam_checklock'] : 0;
            }
            // print_r($arr);die;
            return [
                'status' => true,
                'data' => $arr,
            ];
        } catch (Exception $e) {
            return [
                'status' => false,
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Drop exists document in collection.
     */
    public function dropDocumentPresensi(string $uid)
    {
        try {
            // $this->db->collection('presensi')->document($uid)->delete()
            $delete = $this->firestore->database()->collection('presensi')->document($uid)->delete();

            return true;
        } catch (Exception $exception) {
            return $exception->getMessage();
        }
    }

    // public function migrasiAllPresensi($params = [])
    // {
    //     // pd($params);
    //     try {
    //         $presensi = $this->firestore->database()->collection('presensinews')->documents();

    //         $arr = [];
    //         foreach ($presensi as $key => $value) {
    //             $data = $value->data();
    //             $arr[$key]['foto'] = $data['foto'];
    //             $arr[$key]['id_client'] = (Int) $data['id_client'];
    //             $arr[$key]['id_karyawan'] = (int) $data['id_karyawan'];
    //             $arr[$key]['jam_checklock'] = $data['jam_checklock'];
    //             $arr[$key]['latitude'] = $data['latitude'];
    //             $arr[$key]['longitude'] = $data['longitude'];
    //             $arr[$key]['tgl_checklock'] = $data['tgl_checklock'];
    //             $arr[$key]['time'] = $data['time'];
    //             $arr[$key]['uid'] = $data['uid'];
    //         }

    //         return [
    //             'status' => true,
    //             'data' => $arr,
    //         ];
    //     } catch (Exception $e) {
    //         return [
    //             'status' => false,
    //             'error' => $e->getMessage(),
    //         ];
    //     }
    // }

    /**
     * Ambil Semua Presensi.
     *
     * @param mixed $idclient
     * @param mixed $params
     * @param mixed $pagination
     *
     * @return [array]
     */
    public function getAllPresensiWeb($params, $idclient, $pagination)
    {
        try {
            // Filter
            if (isset($params) && !is_array($params)) {
                // jika parameter dalam bentuk json
                $filter = (isset($params)) ? (array) json_decode($params) : [];
            } elseif (isset($params) && is_array($params)) {
                $filter = $params;
            }

            $tgl_sekarang = date('d/m/Y');
            // pd($tgl_checklock);

            //Kondisi Ketika ada filter idkaryawan saja
            if (!empty($filter['id_karyawan']) && empty($filter['tgl_mulai'])) {
                $idkaryawann = (int) $filter['id_karyawan'];
                $idclientnya = (int) $idclient;
                $perusahaanid = (int) $_SESSION['user']['m_perusahaan']['id'];
                $tglnow = strtotime(date('Y-m-d'));
                // pd($tglnow);
                $collection = $this->firestore->database()->collection('presensi');
                $query = $collection->select(['foto', 'id_client', 'id_karyawan', 'id_perusahaan', 'jam_checklock', 'latitude', 'longitude', 'tgl_checklock', 'time', 'uid'])->where('id_client', '=', $idclientnya)->where('id_karyawan', '=', $idkaryawann)->where('id_perusahaan', '=', $perusahaanid)->where('tgl_checklock', '>=', $tglnow);
                $presensi = $query->documents();
                // $presensi = $this->firestore->database()->collection('presensi')->where('id_client', '=', $idclient)->where('id_karyawan', '=', $filter['id_karyawan'])->where('id_perusahaan', '=', $_SESSION['user']['m_perusahaan']['id'])->documents();
            }

            //Kondisi Ketika tidak ada filter
            // if (empty($filter['id_karyawan']) && empty($filter['tgl_mulai'])) {
            //     // pd('qwe');
            //     // pd($_SESSION['user']['m_perusahaan']['id']);
            //     $presensi = $this->firestore->database()->collection('presensi')->where('id_client', '=', $idclient)->where('id_perusahaan', '=', $_SESSION['user']['m_perusahaan']['id'])->documents();
            // }

            $arr = [];
            $landa = new Landa();
            foreach ($presensi as $key => $value) {
                $data = $value->data();
                $arr[$key]['foto'] = $data['foto'];
                $arr[$key]['id_client'] = $data['id_client'];
                $arr[$key]['id_karyawan'] = $data['id_karyawan'];
                $arr[$key]['latitude'] = $data['latitude'];
                $arr[$key]['longitude'] = $data['longitude'];
                // $arr[$key]['time'] = date('d-M-Y H:i', strtotime($data['time']));
                $arr[$key]['tgl_checklock'] = date('d/m/Y', $data['tgl_checklock']);
                $arr[$key]['jam'] = isset($data['jam_checklock']) ? $data['jam_checklock'] : 0;
                $arr[$key]['uid'] = isset($data['uid']) ? $data['uid'] : '';
            }

            $arrnew = [];
            foreach ($arr as $key => $value) {
                if ($value['tgl_checklock'] != $tgl_sekarang) {
                    unset($value);
                } else {
                    $arrnew[$key] = $value;
                }
            }
            // $keys = array_column($arr, 'jam');
            // array_multisort($keys, SORT_DESC, $arr);

            return [
                'status' => true,
                'data' => $arrnew,
            ];
        } catch (Exception $e) {
            return [
                'status' => false,
                'error' => $e->getMessage(),
            ];
        }
    }

    /**
     * Ambil Semua Presensi.
     *
     * @param mixed $idclient
     * @param mixed $params
     * @param mixed $pagination
     *
     * @return [array]
     */
    public function getUsersCollection($idclient)
    {
        try {
            if (empty($filter['id_karyawan']) && empty($filter['tgl_mulai'])) {
                $presensi = $this->firestore->database()->collection('users')->where('client', '=', $idclient)->documents();
            }
            $arr = [];
            $landa = new Landa();
            foreach ($presensi as $key => $value) {
                $data = $value->data();
                $arr[$key]['client'] = $data['client'];
                $arr[$key]['email'] = $data['email'];
                $arr[$key]['nama'] = $data['nama'];
                $arr[$key]['tipe'] = $data['tipe'];
                $arr[$key]['uid'] = isset($data['uid']) ? $data['uid'] : '';
            }

            return [
                'status' => true,
                'data' => $arr,
            ];
        } catch (Exception $e) {
            return [
                'status' => false,
                'error' => $e->getMessage(),
            ];
        }
    }
}
