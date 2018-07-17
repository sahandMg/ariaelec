<?php

namespace App\Http\Middleware;

use App\Cm;
use Closure;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Facades\JWTAuth;

class CmMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {

        /**
         * Validation of given token
         */
        try{
            JWTAuth::parseToken()->checkOrFail();
        }catch (TokenBlacklistedException $exception){

            return response('300');
        }

        try {
            $userData = Cm::where('token',$request->token)->firstOrFail();

        } catch (\Exception $exception) {

//            Unauthorized error

            return response('320');
        }
        /**
         * Auth::guard('cManager')->login($userData);
         * this line keep user logging in for next requests
         */
        Auth::guard('cManager')->login($userData);

        $_POST['user'] = $userData;

//        if (Auth::guard('cManager')->check()) {

            session(['userToken' => $userData]);

            return $next($request);
//        }else{

//            return 320;
//        }

    }
}