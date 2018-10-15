<?php

namespace App\Http\Controllers;

use App\Events\UserRegister;
use App\Repository\Login;
use App\Repository\Register;
use App\Repository\UserGoogleRegister;
use App\Repository\ValidateQuery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;
use Tymon\JWTAuth\Facades\JWTAuth;



class AuthController extends Controller
{
    public function AdminRegister(Request $request,$role = 'admin'){

//      Admin Register class

       $resp = Register::register($request,$role);

        if(ValidateQuery::$error){
            return $resp;
        }else{
            event(new UserRegister($resp));
        }
        return '200';

    }

//     User/Admin/CM Register Class

    public function register(Request $request){

        $role = $request->role;
        $resp = Register::register($request,$role);

        if(ValidateQuery::$error){
            return $resp;
        }else{
            event(new UserRegister($resp));
        }
        return '200';

    }

    public function login(Request $request)
    {

        return Login::login($request);
    }
//      Google login

//    public function redirectToProvider()
//    {
//
//        return Socialite::driver('google')->redirect();
//    }

    /**
     * @return mixed
     * Google Register & Login
     */
//    public function handleProviderCallback()
//    {
//
//     return  UserGoogleRegister::googleRegister();
//    }

    /**
     * @return int
     */
    public function logout(){

        $forceForever = true;
         JWTAuth::parseToken()->invalidate($forceForever);
        return 200;
    }
}
