<?php

$app->add(function ($request, $response, $next) {
    if ('OPTIONS' !== $request->getMethod()) {
        /**
         * Get route name.
         */
        $route = $request->getAttribute('route');
        $params = $request->getParams();

        $routeName = '';
        if (null !== $route) {
            $routeName = $route->getName();
        }

        /**
         * Set Global route.
         */
        $publicRoutesArray = [
            'login',
            'session',
            'logout',
            'getJam',
            'setSession',
            'apiMobile',
            'formatExcelKaryawan',
            'getStatusPresensi',
            'getNoAdmin',
            'getJadwalNow',
            'apphakakses',
        ];

        $headers = $request->getHeaders();
        if (isset($headers['HTTP_AUTHORIZATION'][0]) && !empty($headers['HTTP_AUTHORIZATION'][0]) && ('Bearer null' != $headers['HTTP_AUTHORIZATION'][0] && 'Bearer bnVsbA==' != $headers['HTTP_AUTHORIZATION'][0])) {
            $token = str_replace('Bearer ', '', $headers['HTTP_AUTHORIZATION'][0]);
            $_SESSION['user'] = json_decode(base64_decode($token), true);
        } elseif (isset($params['idTrans'])) {
            $_SESSION['user'] = json_decode(base64_decode($params['idTrans']), true);
        }

        // Check session
        if (!isset($_SESSION['user']['userId']) && !in_array($routeName, $publicRoutesArray)) {
            // return unauthorizedResponse($response, ['Mohon maaf, anda tidak mempunyai akses']);
        }

        return $next($request, $response);
    }

    return $next($request, $response);
});
