<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        // $userLogins = UserLogin::selectRaw('
        //         UNIX_TIMESTAMP(date_format(login_time, "%Y-%m-%d %H:%i")) as login_minute,
        //         gl_user_login.*')
        //     ->whereRaw('login_time > "2021-12-03 14:25:00"')
        //     ->orderBy('login_minute', 'desc')
        //     ->get()
        //     ->map(function ($item) {
        //         $item['login_minute'] = str_replace('.000000', '', $item['login_minute']);
        //         return $item->only(['login_minute', 'user_id', 'coordinate',
        //             'device_category', 'app_category', 'client_category']);
        //     });

        // $userLogins->groupBy('login_minute')->all();

        // 裝置陣列

        return Inertia::render('Report/Reportinghub', [
            //
        ]);
    }
}
