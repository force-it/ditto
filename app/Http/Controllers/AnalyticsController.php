<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class AnalyticsController extends Controller
{
   public function index(Request $request)
    {
        return Inertia::render('Realtime/Overview');
    }
}
