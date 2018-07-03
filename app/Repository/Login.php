<?php
/**
 * Created by PhpStorm.
 * User: Sahand
 * Date: 4/28/18
 * Time: 9:49 AM
 */

namespace App\Repository;


use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class Login
{

    public static function login($request){

        try{

            $token = JWTAuth::attempt(['email'=> $request->email,'password'=>$request->password]);
            if(!$token){

                return 'ایمیل یا کلمه عبور اشتباه است';
            }

        }
        catch(JWTException $ex){

            return '500';
        }
//        $user = JWTAuth::parseToken()->toUser();
        $user = Auth::user();
        $user->update(['token'=>$token]);

        return ['token'=>$token,'userData'=>$user];
    }

}