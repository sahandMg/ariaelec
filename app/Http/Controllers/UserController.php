<?php

namespace App\Http\Controllers;

use App\Events\UserRegister;
use App\Repository\GoogleRegister;
use App\Repository\ValidateQuery;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{

    public function __construct()
    {
        $this->middleware('guest')->except('register','login');
    }

    public function register(Request $request)
    {

        if (ValidateQuery::check($request)) {

            return ValidateQuery::check($request);
        }

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
//        $user->reset_password = str_shuffle("ajleyqwncx3497");
//        $user->avatar = 'Blank100*100.png';
        $user->save();

            event(new UserRegister($user));

        return '200';

    }

    public function login(Request $request)
    {

        try{

            $token = Auth::guard('user')->attempt(['email'=> $request->email,'password'=>$request->password]);
            if(!$token){

                return '404';
            }

        }
        catch(JWTException $ex){

            return '500';
        }
//        $user = JWTAuth::parseToken()->toUser();
        $user = Auth::guard('user')->user();
        $user->update(['token'=>$token]);
        $user['role'] = null ;
        return ['token'=>$token,'userData'=>$user];

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

}
