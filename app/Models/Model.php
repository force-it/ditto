<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model as BaseModel;

class Model extends BaseModel
{
    private $globalHidden = ['created_at', 'updated_at'];

    public function __construct(array $attributes = array()){
        $this->hidden = array_merge($this->globalHidden, $this->hidden);
        parent::__construct($attributes);
    }
}
