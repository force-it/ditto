<?php

namespace App\Models\Og;

use App\Models\Model;
use Illuminate\Support\Facades\Cache;
use Rap2hpoutre\FastExcel\Facades\FastExcel;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class UserLogin extends Model
{
    use HasFactory;

    protected $connection = 'og';

    protected $table = 'gl_user_login';

    public $timestamps = false;

    protected $appends = [
        'coordinate',
        'device_category',
        'client_category'
    ];

    public function getAddressAttribute($value)
    {
        return explode('|', $value);
    }

    public function getClientCategoryAttribute()
    {
        return match($this->client_type) {
            1 => 'h5',
            2 => 'android',
            3 => 'ios',
            0 => 'pc',
        };
    }

    public function getDeviceCategoryAttribute()
    {
        return match($this->client_type) {
            1, 2, 3 => 'mobile',
            0 => 'desktop',
        };
    }

    public function getCoordinateAttribute()
    {
        if ($this->address[0] === '中国' && $this->address[2] !== '0') {
            $cities = Cache::rememberForever('cities', function () {
                return FastExcel::import(storage_path('cities.csv'));
            });

            return $cities->where('name', __('city.'.$this->address[2]))->first();
        }

        return null;
    }
}
