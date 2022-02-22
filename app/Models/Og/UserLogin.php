<?php

namespace App\Models\Og;

use App\Models\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserLogin extends Model
{
    use HasFactory;

    protected $connection = 'og';

    protected $table = 'gl_user_login';

    public $timestamps = false;
}
