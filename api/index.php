<?php
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
error_reporting( E_ALL );
ini_set('memory_limit', '-1');
// ini_set('display_errors', 1);
// ini_set('display_startup_errors', 1);
// error_reporting(E_ALL & ~E_NOTICE);

if (isset($_SERVER['HTTP_ORIGIN'])) {
   	header("Access-Control-Allow-Origin: http://localhost:4200");
   	// header("Access-Control-Allow-Origin: http://192.168.1.133:4200");
    header('Access-Control-Allow-Credentials: true');
    header('Access-Control-Max-Age: 86400');
    header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization");
}


if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD'])) {
        // may also be using PUT, PATCH, HEAD etc
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
    }
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS'])) {
        header("Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization");
    }
}

# Session lifetime of 20 hours
ini_set('session.gc_maxlifetime', 20 * 60 * 60);
ini_set('session.gc_probability', 1);
ini_set('session.gc_divisor', 100);
ini_set('session.use_cookies', 1);
date_default_timezone_set("Asia/Jakarta");

if (!file_exists(__DIR__ . '/sessions')) {
    mkdir(__DIR__ . '/sessions', 0777, true);
}

session_save_path(__DIR__ . '/sessions');
session_name( 'humanis' );
session_start();

require 'vendor/autoload.php';
/* --- System --- */
require 'src/systems/gump-validation/gump.class.php';
require 'src/systems/domain.php';
require 'src/systems/systems.php';
require 'src/systems/functions.php';

if (file_exists('vendor/cahkampung/landa-php/src/LandaPhp.php')) {
    require 'vendor/cahkampung/landa-php/src/LandaPhp.php';
}

if (file_exists('vendor/cahkampung/landa-acc/functions.php')) {
    require 'vendor/cahkampung/landa-acc/functions.php';
}

if(config('TELEGRAM_LOG') == true){
	set_error_handler("errorHandler");
	register_shutdown_function("shutdownHandler");
	ini_set("display_errors", 0);	
}

$config = [
    'displayErrorDetails'               => config('DISPLAY_ERROR'),
    'determineRouteBeforeAppMiddleware' => true,
];

$container = new \Slim\Container(["settings" => $config]);

$app = new \Slim\App($container);
$app->options('/{routes:.+}', function ( $request,  $response, $args) {
    return $response;
});

require 'src/systems/dependencies.php';
require 'src/systems/middleware.php';

/** route to php file */
$file = getUrlFile();
// print_r($file);exit();
require $file;
$app->run();
