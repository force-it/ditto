<?php

use Inertia\Inertia;
use App\Models\Og\UserLogin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Foundation\Application;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\Admin\HomeController;
use App\Http\Controllers\WebhookReceiverController;
use App\Http\Controllers\Admin\OrganizationController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect()->route('dashboard');
});

Route::group(['middleware' => ['auth:sanctum', 'verified']], function () {
    Route::get('/dashboard', [AnalyticsController::class, 'index'])->name('dashboard');

    Route::get('/reportinghub', [ReportController::class, 'index'])->name('reportinghub');

    Route::get('/webhooks', [WebhookReceiverController::class, 'index'])->name('webhooks');
    Route::get('/webhooks/create', [WebhookReceiverController::class, 'create'])->name('webhooks.create');
    Route::get('/webhooks/{webhookReceiver}', [WebhookReceiverController::class, 'show'])
        ->name('webhooks.show')
        ->missing(function (Request $request) {
            return redirect()->route('webhooks');
        });
    Route::put('/webhooks/{webhookReceiver}', [WebhookReceiverController::class, 'update'])->name('webhooks.update');
    Route::delete('/webhooks/{webhookReceiver}', [WebhookReceiverController::class, 'destroy'])->name('webhooks.destroy');

    Route::get('/admin/home', [HomeController::class, 'index'])->name('admin.home');
    Route::get('/admin/organizations', [OrganizationController::class, 'index'])->name('admin.organizations');
});

Route::get('/messages/{message}/resloved', [WebhookReceiverController::class, 'resloved']);

require __DIR__.'/auth.php';
