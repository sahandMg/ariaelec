<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;
use Tymon\JWTAuth\Facades\JWTAuth;


class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @param  string|null  $guard
     * @return mixed
     */
    public function handle($request, Closure $next, $guard = null)
    {
        try {
            $userData = JWTAuth::parseToken()->toUser();
        } catch (TokenExpiredException $exception) {

//          throw new TokenException($exception);
            return 300;
        }
//        new TokenUpdater(User::where('token',JWTAuth::getToken())->first());

        $_POST['user'] = $userData;

        if (Auth::guard('user')->check()) {

            session(['userToken' => $userData]);

            return $next($request);
        }else{

            return 320;
        }

    }
}
