<?php

namespace App\Http\Controllers;

use App\Events\UserRegister;
use App\Repository\ValidateQuery;
use App\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{

    public function __construct()
    {
        $this->middleware('guest')->except('register','login','redirectToProvider','handleProviderCallback');
    }

    public function register(Request $request)
    {
/*
 * Get generated token in google registration + password
 * Update user password column
 * Login the user and update the token column
 */

        if($request->has('token')){

            try{
                $newUser = User::where('token',$request->token)->firstOrFail();
            }catch (\Exception $exception){
                return 404;
            }
            $valid = Validator::make($request->all(),[
                'password'=>'required|min:8'
            ]);
            if($valid->fails()){

                if(isset(json_decode($valid->errors(),true)['password'])){

                    return json_decode($valid->errors(),true);

                }
            }
            $newUser->update(['password'=>Hash::make($request->password)]);
            $token = Auth::guard('user')->login($newUser);
            $newUser['role'] = null ;
            $newUser->update(['token'=>$token]);
            return ['token'=>$token,'userData'=>$newUser];

        }else {


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
        $user = User::where('email',$client->email)->first();

        if($user == null) {
            $user = new User();
            $user->name = $client->name;
            $user->email = $client->email;;
            $user->avatar = $client->avatar;
            $user->token = str_random(80);
            $user->save();


//        $token = Auth::guard('user')->login($user);
//        $user->update(['token'=>$token]);
            /**
             * TODO change this url on server
             */
            return redirect('http://localhost/google/' . $user->token);
//        return  UserGoogleRegister::googleRegister();
        }else{
                $token = Auth::guard('user')->login($user);
                $user->update(['token'=>$token]);
            //TODO this url should be changed and logged in user token will be sent over url
            return redirect('http://localhost/googleLogin/' . $user->token);
        }
    }

    public function userData(Request $request){

        $user = Auth::guard('user')->user();
        $user['role'] = null ;
        return ['token'=>$request->token,'userData'=>$user];
    }


}
