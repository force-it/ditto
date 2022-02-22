<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\Model;

class Bot extends Model
{
    use HasFactory;

    const TYPE_NOTIFY = 'notify';
    const TYPE_RECEIVER = 'receiver';

    protected $hidden = [
        'token',
        'created_at',
    ];

    protected $casts = [
        'meta' => 'object',
    ];
}
