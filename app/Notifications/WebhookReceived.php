<?php

namespace App\Notifications;

use Illuminate\Support\Str;
use Illuminate\Bus\Queueable;
use App\Models\WebhookReceiver;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use NotificationChannels\Telegram\TelegramChannel;
use NotificationChannels\Telegram\TelegramMessage;

class WebhookReceived extends Notification
{
    use Queueable;

    /**
     * Create a new notification instance.
     *
     * @return void
     */
    public function __construct(WebhookReceiver $webhookReceiver, $data, $buttonUrl)
    {
        $this->webhookReceiver = $webhookReceiver;
        $this->data = $data;
        $this->buttonUrl = $buttonUrl;
    }

    /**
     * Get the notification's delivery channels.
     *
     * @param  mixed  $notifiable
     * @return array
     */
    public function via($notifiable)
    {
        return [TelegramChannel::class];
    }

    public function toTelegram($notifiable)
    {
        if ($this->buttonUrl) {
            $url = data_get($this->webhookReceiver, 'buttons.replace') ?
                Str::replace(
                    data_get($this->webhookReceiver, 'buttons.replace.before'),
                    data_get($this->webhookReceiver, 'buttons.replace.after'),
                    $this->buttonUrl) :
                $this->buttonUrl;

            return TelegramMessage::create()
                ->content(
                    // Telegram 只能發送 4096 bytes 的資料，扣掉 Str:limit end 結尾的三個點，只剩下 4093 bytes。
                    // 未來加入分批發送功能（可透過 Content-Length 取得字串長度再去 Chunk）。
                    '*' . Str::limit(mb_convert_encoding($this->data, "UTF-8"), 4093) . '*'
                )
                ->button(data_get($this->webhookReceiver, 'buttons.name', '開啟連結'),  $this->buttonUrl)
                ->token($this->webhookReceiver->bot->token);
        }

        return TelegramMessage::create()
            ->content(
                // Telegram 只能發送 4096 bytes 的資料，扣掉 Str:limit end 結尾的三個點，只剩下 4093 bytes。
                // 未來加入分批發送功能（可透過 Content-Length 取得字串長度再去 Chunk）。
                '*' . Str::limit(mb_convert_encoding($this->data, "UTF-8"), 4093) . '*'
            )->token($this->webhookReceiver->bot->token);
    }

    public function failed(\Exception $e)
    {
        $this->webhookReceiver->malfunction = $e->getMessage();
        $this->webhookReceiver->save();
    }
}
