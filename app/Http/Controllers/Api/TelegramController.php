<?php

namespace App\Http\Controllers\Api;

use App\Models\Bot;
use ReflectionMethod;
use App\Models\Message;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Models\WebhookReceiver;
use App\Events\TelegramConnected;
use Illuminate\Support\Facades\Log;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Cache;
use App\Exceptions\NotCommandException;
use App\Exceptions\TokenInvokeException;
use Illuminate\Support\Facades\Validator;
use App\Exceptions\SomethingWrongException;
use App\Notifications\TelegramBotConnected;
use NotificationChannels\Telegram\Telegram;
use Illuminate\Support\Facades\Notification;
use Illuminate\Validation\ValidationException;

class TelegramController extends Controller
{
     public function link(Request $request)
    {
        Validator::make($request->all(), [
            'bot_token' => ['required', 'string'],
            'name' => ['required', 'string'],
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
            auth()->user()->id.' '.str_replace(' ', '-', $request->name).' '.$bot->id,
            3600
        );

        return response()->json([
            'url' => 'https://t.me/' . $result['username'] . '?startgroup=' . $token,
            'token' => $token,
        ]);
    }

    public function webhook(Request $request)
    {
        Log::info("TelegramController::Webhook", [
            'Request Body:' => $request->all(),
        ]);

        $command = $this->getCommand($request);

        switch ($command) {
            case 'start':
                return $this->start($request);
            case 'resloved_message':
                return $this->reslovedMessage($request);
            default:
                throw new SomethingWrongException('Not support command');
        }
    }

    private function start($request)
    {
        try {
            $token = explode(' ', data_get($request, 'message.text'))[1];
            list($userId, $name, $botId) = explode(' ', Cache::get($token));
        } catch (\Throwable $th) {
            throw new TokenInvokeException();
        }

        Cache::forget($token);

        $webhookReceiver = WebhookReceiver::updateOrCreate([
            'name' => $name,
            'token' => $token,
        ], [
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

    private function reslovedMessage($request)
    {
        $token = explode(' ', data_get($request, 'callback_query.data'))[1];
        try {
            Message::whereToken($token)->firstOrFail()->delete();
        } catch (\Throwable $th) {
            //throw $th;
        }

        $inlineKeyboard = data_get($request, 'callback_query.message.reply_markup.inline_keyboard.0');
        foreach ($inlineKeyboard as $key => $value) {
            if (Str::contains(data_get($value, 'callback_data'), '/resloved_message')) {
                unset($inlineKeyboard[$key]);
            }
        }

        $bot = Bot::whereUsername(data_get($request, 'callback_query.message.from.username'))->first();

        $r = new ReflectionMethod(Telegram::class, 'sendRequest');
        $r->setAccessible(true);
        $r->invoke(new Telegram($bot->token), "editMessageReplyMarkup", [
            'chat_id' => data_get($request, 'callback_query.message.chat.id'),
            'message_id' => data_get($request, 'callback_query.message.message_id'),
            'reply_markup' => [
                'inline_keyboard' => $inlineKeyboard,
            ]
        ]);

        \Log::info('TelegramController::ReslovedMessage', [
            'Token:' => $token,
        ]);

        return response()->json([
            'ok' => true,
            'result' => true,
            'description' => '已關閉提醒'
        ]);
    }

    private function getCommand($request)
    {
        $text = '';
        if (data_get($request, 'message')) {
            $text = explode(' ', data_get($request, 'message.text'))[0];
        } elseif (data_get($request, 'callback_query')) {
            $text = explode(' ', data_get($request, 'callback_query.data'))[0];
        }

        if (!Str::startsWith($text, '/')) {
            throw new NotCommandException();
        };

        return Str::of($text)->after('/')->before('@');
    }

    public function relink(Request $request, $webhookReceiverId)
    {
        $webhookReceiver = WebhookReceiver::with('bot')->find($webhookReceiverId);

        Cache::put(
            $webhookReceiver->token,
            auth()->user()->id . ' '. $webhookReceiver->name . ' ' . $webhookReceiver->bot->id,
            3600
        );

        $r = new ReflectionMethod(Telegram::class, 'sendRequest');
        $r->setAccessible(true);
        $r->invoke(new Telegram($webhookReceiver->bot->token), "setWebhook", [
            'url' => config('receiver.host') . '/api/telegram',
        ]);

        return response()->json([
            'url' => 'https://t.me/' . $webhookReceiver->bot->username . '?startgroup=' . $webhookReceiver->token,
            'token' => $webhookReceiver->token,
        ]);
    }
}
