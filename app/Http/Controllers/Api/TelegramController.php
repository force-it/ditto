<?php

namespace App\Http\Controllers\Api;

use App\Models\Bot;
use ReflectionMethod;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\WebhookReceiver;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Validator;
use App\Notifications\TelegramBotConnected;
use NotificationChannels\Telegram\Telegram;
use Illuminate\Support\Facades\Notification;
use Illuminate\Validation\ValidationException;
use App\Events\TelegramConnected;

class TelegramController extends Controller
{
     public function link(Request $request)
    {
        Validator::make($request->all(), [
            'bot_token' => ['required', 'string'],
        ])->validateWithBag('link');

        try {
            $r = new ReflectionMethod(Telegram::class, 'sendRequest');
            $r->setAccessible(true);
            $response = $r->invoke(new Telegram($request->bot_token), "getMe", []);

            $result = (json_decode($response->getBody(), true) ?? [])['result'];

            $r->invoke(new Telegram($request->bot_token), "setWebhook", [
                'url' => config('receiver.host') . '/api/telegram',
            ]);

            $bot = Bot::updateOrCreate([
                'token' => $request->bot_token,
                'type' => Bot::TYPE_RECEIVER,
                'team_id' => null,
            ], [
                'name' => $result['first_name'],
                'username' => $result['username'],
                'meta' => $result,
            ]);
        } catch (\Throwable $th) {
            throw ValidationException::withMessages(['bot_token' => '請確認 Bot Token 是否有誤。' . $th->getMessage()])->errorBag('botLink');
        }

        $token = Str::random(32);
        Cache::put(
            $token,
            auth()->user()->id . ' ' . $bot->id,
            3600
        );

        return response()->json([
            'url' => 'https://t.me/' . $result['username'] . '?startgroup=' . $token,
            'token' => $token,
        ]);
    }

    public function callback(Request $request)
    {
        Log::debug("tg bot callback", $request->all());

        try {
            $token = explode(' ', data_get($request, 'message.text'))[1];
            list($userId, $botId) = explode(' ', Cache::get($token));
        } catch (\Throwable $th) {
            return response()->json([
                'ok' => true,
                'result' => false,
                'description' => '此操作已失效。'
            ]);
        }

        Cache::forget($token);

        $webhookReceiver = WebhookReceiver::updateOrCreate([
            'token' => $token,
        ], [
            'jmte' => '',
            'user_id' => $userId,
            'bot_id' => $botId,
            'chat' => data_get($request, 'message.chat'),
        ]);

        Notification::route('telegram', data_get($request, 'message.chat.id'))
            ->notify(new TelegramBotConnected($webhookReceiver->bot->token));

        TelegramConnected::dispatch($webhookReceiver->id, $token);

        return response()->json([
            'ok' => true,
            'result' => true,
            'description' => '成功建立 Webhook 接收器。'
        ]);
    }

    public function relink(Request $request, $webhookReceiverId)
    {
        $webhookReceiver = WebhookReceiver::with('bot')->find($webhookReceiverId);

        Cache::put(
            $webhookReceiver->token,
            auth()->user()->id . ' ' . $webhookReceiver->bot->id,
            3600
        );

        return response()->json([
            'url' => 'https://t.me/' . $webhookReceiver->bot->username . '?startgroup=' . $webhookReceiver->token,
            'token' => $webhookReceiver->token,
        ]);
    }
}
