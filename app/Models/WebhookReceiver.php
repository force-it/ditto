<?php

namespace App\Models;

use Illuminate\Support\Str;
use Illuminate\Support\Facades\Log;
use App\Models\Model;
use Illuminate\Database\Eloquent\Casts\AsCollection;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class WebhookReceiver extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'chat' => 'array',
        'dql' => 'object',
        'buttons' => AsCollection::class,
        'alerts' => 'array',
        'repeat' => 'boolean',
    ];

    protected $appends = [
        'url',
    ];

    /**
     * Retrieve the model for a bound value.
     *
     * @param  mixed  $value
     * @param  string|null  $field
     * @return \Illuminate\Database\Eloquent\Model|null
     */
    public function resolveRouteBinding($value, $field = null)
    {
        return $this->with('bot')->where('id', $value)->firstOrFail();
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bot()
    {
        return $this->belongsTo(Bot::class);
    }

    public function getUrlAttribute()
    {
        return config('receiver.host') . '/api/webhooks/' . $this->token;
    }

    public function getJmteAttribute($value)
    {
        return $value ?? '';
    }

    public function getMalfunctionAttribute($value)
    {
        return Str::contains($value, 'message must be non-empty') ? '請設定訊息模板。' : $value;
    }
}
