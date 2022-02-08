<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\WebhookController;
use App\Http\Controllers\Api\TelegramController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/link', [TelegramController::class, 'link'])->name('api.link');
    Route::get('/link/{webhookReceiver}', [TelegramController::class, 'relink'])->name('api.link.relink');
});

Route::post('/telegram', [TelegramController::class, 'callback']);

Route::post('/webhooks/{token}', [WebhookController::class, 'receive']);
