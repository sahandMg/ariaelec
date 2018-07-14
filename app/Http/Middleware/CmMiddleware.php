<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
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
        try {
            $userData = JWTAuth::parseToken()->toUser();
        } catch (TokenBlacklistedException $exception) {

//          throw new TokenException($exception);
            return 300;
        }
//        new TokenUpdater(User::where('token',JWTAuth::getToken())->first());

        $_POST['user'] = $userData;

        if (Auth::guard('cManager')->check()) {

            session(['userToken' => $userData]);

            return $next($request);
        }else{

            return 320;
        }

    }
}