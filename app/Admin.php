<?php

namespace App;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
//use Illuminate\Contracts\Auth\Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Admin extends Authenticatable implements JWTSubject
{

    protected $fillable = ['token'];
    protected $guard = 'admin';

    public function getJWTCustomClaims():array
    {
        return [];

    }

    public function getJWTIdentifier()
    {

        return $this->getKey();
    }

}
