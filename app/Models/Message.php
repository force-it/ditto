<?php

namespace App\Models;

use App\Models\Model;
use App\Models\WebhookReceiver;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Message extends Model
{
    use HasFactory;

    protected $guarded = [];

    public function webhookReceiver()
    {
        return $this->belongsTo(WebhookReceiver::class);
    }
}
