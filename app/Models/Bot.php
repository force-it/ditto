<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bot extends Model
{
    use HasFactory;

    const TYPE_NOTIFY = 'notify';
    const TYPE_RECEIVER = 'receiver';

    protected $guarded = [];

    protected $casts = [
        'meta' => 'object',
    ];
}
