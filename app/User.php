<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Cviebrock\EloquentSluggable\Sluggable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use Notifiable;
    use Sluggable;
    protected $guard = 'user';
    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password','token','avatar'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

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


    public function brief(){

        return $this->hasMany('App\Brief');
    }

    public function images(){

        return $this->hasMany('App\Image');
    }

    public function boms(){

        return $this->hasMany('App\Bom');
    }

    public function projects(){

        return $this->hasMany(Project::class);
    }

}
