<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Project extends Model
{
    public function cart(){

        return $this->hasOne(Cart::class);
    }
}
