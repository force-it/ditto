<?php

namespace App\Jobs;

use App\Models\Message;
use Illuminate\Bus\Queueable;
use App\Notifications\WebhookReceived;
use Illuminate\Queue\SerializesModels;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Support\Facades\Notification;
use Illuminate\Contracts\Queue\ShouldBeUnique;

class SendRepeatMessage implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    /**
     * Execute the job.
     *
     * @return void
     */
    public function handle()
    {
        Message::with('webhookReceiver')->chunk(200, function ($messages) {
            foreach ($messages as $message) {
                if ($message->webhookReceiver->repeat) {
                    Notification::route('telegram', data_get($message->webhookReceiver, 'chat.id'))
                    ->notify(new WebhookReceived($message->webhookReceiver, $message));
                } else {
                    $message->delete();
                }
            }
        });
    }
}
