<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class WebhookReceiver extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'chat' => 'array',
        'dql' => 'object',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bot()
    {
        return $this->belongsTo(Bot::class);
    }
}
