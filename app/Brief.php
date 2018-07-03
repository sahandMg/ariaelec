<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Brief extends Model
{


    protected $fillable = ['title','days','abstract','image','product','category'];
    public function detail(){

        return $this->hasOne('App\Detail');
    }

    public function images(){
        return $this->hasMany('App\Image');
    }
}
