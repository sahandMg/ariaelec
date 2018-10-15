<?php
/**
 * Created by PhpStorm.
 * User: Sahand
 * Date: 4/28/18
 * Time: 11:38 AM
 */

namespace App\Repository;


use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Laravel\Socialite\Facades\Socialite;
use App\User;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserGoogleRegister
{
/*
 * Get user data from google
 * create a new query in users
 * fill avatar column
 * login the user after registration
 * $role defines if the user is cm or user
 * stateless statement makes session off while using token
 */
    public static function googleRegister(){

        $client =  Socialite::driver('google')->stateless()->user();

//        try{
//            $user = User::where('email',$client->email)->firstOrFaile();
//        }catch (\Exception $exception){
//
//            return 404;
//        }

//            $userData = JWTAuth::parseToken()->authenticate();

//            return ['token'=>$token,'userData'=>$user];

            $user = User::where('email',$client->email)->first();
        if(!is_null($user)){
            $token = Auth::guard('user')->login($user);
            $user->update(['token'=>$token]);
            return ['token'=>$token,'userData'=>$user];
        }

            $user = new User();
            $user->name = $client->name;
            $user->email = $client->email;
            $user->avatar = $client->avatar;
            $user->save();
            $token = Auth::guard('user')->login($user);
            $user->update(['token'=>$token]);

        return response(200);


    }
}