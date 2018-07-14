<?php

namespace App\Http\Controllers;

use App\Events\UserRegister;
use App\Repository\GoogleRegister;
use App\Repository\Login;
use App\Repository\Register;
use App\Repository\ValidateQuery;
use Illuminate\Http\Request;
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

    public function redirectToProvider()
    {

        return Socialite::driver('google')->redirect();
    }

    /**
     * Obtain the user information from GitHub.
     *
     * @return \Illuminate\Http\Response
     */
    public function handleProviderCallback()
    {


     return  GoogleRegister::googleRegister();

    }

    /**
     * @return int
     */
    public function logout(){

        $user = JWTAuth::parseToken()->toUser();
        $user->update(['token'=>null]);
         JWTAuth::parseToken()->invalidate();
        return 200;
    }
}
