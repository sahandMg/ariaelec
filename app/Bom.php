<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bom extends Model
{
    protected $fillable = ['price','status'];
    public function user(){

        return $this->hasOne(User::class);
    }
    public function carts(){

        return $this->hasMany(Cart::class);
    }
}
