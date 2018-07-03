<?php

namespace App\Http\Middleware;

use App\Exceptions\TokenException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Exceptions\JWTException;
use App\Http\Controllers\AuthController;
use App\Repository\TokenUpdater;
use App\Repository\Users;
use App\User;
use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Event;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Token;
use Tymon\JWTAuth\Validators\TokenValidator;

class UserMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */


//    Use This middleware for authenticated routes

    public function handle($request, Closure $next)
    {

        try {
            JWTAuth::parseToken()->toUser();
    } catch (\Exception $exception){

//          throw new TokenException($exception);
            return redirect('login');
        }
//        new TokenUpdater(User::where('token',JWTAuth::getToken())->first());

        $userData = JWTAuth::parseToken()->authenticate();
        if($userData->role == null){


        $_POST['user'] = JWTAuth::parseToken()->toUser();

        session(['userToken'=>$userData]);

        return $next($request);
        }else{

//            return 320;
            return $next($request);
        }
    }



}
