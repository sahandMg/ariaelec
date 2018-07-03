<?php

namespace App\Http\Middleware;

use Closure;
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
            JWTAuth::parseToken()->toUser();
        } catch (\Exception $exception) {

//          throw new TokenException($exception);
            return 300;
        }
//        new TokenUpdater(User::where('token',JWTAuth::getToken())->first());

        $userData = JWTAuth::parseToken()->authenticate();
        $_POST['user'] = JWTAuth::parseToken()->toUser();

        if ($userData->role == 'cm') {


            session(['userToken' => $userData]);

            return $next($request);
        }else{

            return 320;
        }

    }
}