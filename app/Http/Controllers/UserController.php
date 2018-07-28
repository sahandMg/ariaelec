<?php

namespace App\Http\Controllers;

use App\Cm;
use App\Events\UserRegister;
use App\Repository\UserGoogleRegister;
use App\Repository\ValidateQuery;
use App\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Tymon\JWTAuth\Facades\JWTAuth;

class UserController extends Controller
{

    public function __construct()
    {
        $this->middleware('guest')->except('register','login','redirectToProvider','handleProviderCallback');
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


    public function redirectToProvider()
    {
        return Socialite::driver('google')->redirect();
    }

    /**
     * Obtain the user information from Google+.
     *
     * @return \Illuminate\Http\Response
     */
    public function handleProviderCallback()
    {
        $client =  Socialite::driver('google')->stateless()->user();
        $email = $client->email;
        $user = User::where('email',$email)->first();
        if($user == null) {
            $user = Cm::where('email', $email)->first();
            $user['role'] = 'cm' ;
            $token = Auth::guard('cManager')->login($user);
            $user->update(['token'=>$token]);
            return response([$token,$user]);
        }
        $token = Auth::guard('user')->login($user);
        $user->update(['token'=>$token]);
        return response([$token,$user]);
//        return  UserGoogleRegister::googleRegister();
    }

}
