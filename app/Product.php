<?php

namespace App;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use RelationshipsTrait;
    protected $fillable = ['slug'];
    public function components(){

        return $this->hasMany('App\Component');

    }



}
