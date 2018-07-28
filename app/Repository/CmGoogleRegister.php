<?php
/**
 * Created by PhpStorm.
 * User: Sahand
 * Date: 4/28/18
 * Time: 11:38 AM
 */

namespace App\Repository;


use App\Cm;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use App\User;
use Tymon\JWTAuth\Facades\JWTAuth;

class CmGoogleRegister
{

    public static function googleRegister(){

        $client =  Socialite::driver('google')->stateless()->user();

//        try{
//            $user = User::where('email',$client->email)->firstOrFaile();
//        }catch (\Exception $exception){
//
//            return 404;
//        }
        dd('cm',$client);
//            $userData = JWTAuth::parseToken()->authenticate();

//            return ['token'=>$token,'userData'=>$user];


        $user = new Cm();
        $user->name = $client->name;
        $user->email = $client->email;
        $user->avatar = $client->avatar;
        $user->save();
        $token = Auth::guard('cm')->logn($user);
        $user->update(['token'=>$token]);

        return response(200);
    }
}