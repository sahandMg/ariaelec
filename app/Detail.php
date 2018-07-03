<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Detail extends Model
{
    protected $fillable = ['text'];

    public function brief(){

       return $this->belongsTo(Brief::class);
    }
}
