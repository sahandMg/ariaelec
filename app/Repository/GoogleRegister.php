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

class GoogleRegister
{

    public static function googleRegister(){

        $client =  Socialite::driver('google')->user();


        if(count(User::where('email',$client->email)->first())>0){

            $user = User::where('email',$client->email)->first();


//            $userData = JWTAuth::parseToken()->authenticate();

            $token = JWTAuth::fromUser($user);
            $user->update(['token'=>$token]);
            $user->update(['avatar'=>$client->avatar]);


            return redirect('login');
//            return ['token'=>$token,'userData'=>$user];
        }
        else{

            $user = new User();
            $user->name = $client->name;
            $user->email = $client->email;
            $user->avatar = $client->avatar;
            $user->role = 'cm';
            $user->save();
            $user->update(['token' => JWTAuth::fromUser($user)]);
            return redirect('login');
        }

    }
}