<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

/**
 */
class Cart extends Model
{
    protected $fillable = ['name','project_id'];

    public function bom(){
        return $this->belongsTo(Bom::class);
    }

}
