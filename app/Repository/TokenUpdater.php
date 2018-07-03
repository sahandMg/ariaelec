<?php
/**
 * Created by PhpStorm.
 * User: Sahand
 * Date: 4/23/18
 * Time: 12:13 PM
 */

namespace App\Repository;

use App\User;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

//use Tymon\JWTAuth\JWTAuth;

class TokenUpdater
{


    protected $user;
    public $newToken;

    public function __construct(User $user)
    {

//  ParsToken() will use the token given in post request NOT the refreshed token!!!!

        $userData = JWTAuth::parseToken()->authenticate();
//        dd($token);
        $_POST['user'] = JWTAuth::parseToken()->toUser();
//        $newToken = JWTAuth::refresh($token);
//        $user->update(['token'=>$newToken]);
        session(['userToken'=>$userData]);


    }
}
