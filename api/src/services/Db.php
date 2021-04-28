<?php

namespace Service;

/**
 * Inialisasi koneksi database.
 */
class Db
{
    /**
     * Database utama.
     */
    public static function db()
    {
        if (1 == config('PRODUCTION') || true == config('PRODUCTION')) {
            $landa = new Landa();
            $db['db'] = [
                'DB_HOST' => $landa->unsafeString($_SESSION['user']['safeEmail']['safeEmail1']),
                'DB_NAME' => $landa->unsafeString($_SESSION['user']['safeEmail']['safeEmail2']),
                'DB_PASS' => $landa->unsafeString($_SESSION['user']['safeEmail']['safeEmail3']),
                'DB_USER' => $landa->unsafeString($_SESSION['user']['safeEmail']['safeEmail4']),
                'DB_CHARSET' => 'utf8',
                'CREATED_USER' => 'created_by',
                'CREATED_TIME' => 'created_at',
                'CREATED_TYPE' => 'int',
                'MODIFIED_USER' => 'modified_by',
                'MODIFIED_TIME' => 'modified_at',
                'MODIFIED_TYPE' => 'int',
                'DISPLAY_ERRORS' => true,
                'USER_ID' => isset($_SESSION['user']['userId']) ? $_SESSION['user']['userId'] : 0,
                'USER_NAMA' => isset($_SESSION['user']['nama']) ? $_SESSION['user']['nama'] : 'User belum disetting',
                'USER_LOG' => false,
                'LOG_FOLDER' => 'userlog',
            ];

            return new \Cahkampung\Landadb($db['db']);
        }

        return new \Cahkampung\Landadb(config('DB')['db']);
    }
}
