<?php

namespace App;

use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use RelationshipsTrait;
    protected $fillable = ['slug','product_name'];
    public function components(){

        return $this->hasMany('App\Component');

    }



}
