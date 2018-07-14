<?php

namespace App\Http\Middleware;

use Closure;

use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Exceptions\TokenBlacklistedException;
use Tymon\JWTAuth\Facades\JWTAuth;

class AdminMiddleware
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

        /**
         * checks authenticated user guard
         */

        if(Auth::guard('admin')->check()){

            session(['userToken' => $userData]);
            return $next($request);
        }
        else{
            return response('320');
        }

}
}
