<?php
/**
 * Created by PhpStorm.
 * User: Sahand
 * Date: 4/28/18
 * Time: 11:38 AM
 */

namespace App\Repository;


use Illuminate\Support\Facades\Auth;
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
 */
    public static function googleRegister(){

        $client =  Socialite::driver('google')->stateless()->user();

//        try{
//            $user = User::where('email',$client->email)->firstOrFaile();
//        }catch (\Exception $exception){
//
//            return 404;
//        }
            dd('user',$client);
//            $userData = JWTAuth::parseToken()->authenticate();

//            return ['token'=>$token,'userData'=>$user];


            $user = new User();
            $user->name = $client->name;
            $user->email = $client->email;
            $user->avatar = $client->avatar;
            $user->save();
            $token = Auth::guard('user')->logn($user);
            $user->update(['token'=>$token]);

        return response(200);


    }
}