<?php

namespace App;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Contracts\Auth\Guard;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Cm extends Authenticatable implements JWTSubject
{
    use Sluggable;

    protected $guard = 'cManager';
    protected $fillable = ['token'];
    public function getJWTCustomClaims():array
    {
        return [];

    }

    public function getJWTIdentifier()
    {

        $this->getKey();
    }

    public function sluggable(): array
    {

        return [
            'slug' => [
                'source' => 'name'
            ]
        ];
    }
}
