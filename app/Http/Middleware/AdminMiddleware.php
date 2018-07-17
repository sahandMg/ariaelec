<?php

namespace App\Http\Middleware;

use App\Admin;
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
        try{
            JWTAuth::parseToken()->checkOrFail();
        }catch (TokenBlacklistedException $exception){

            return response('300');
        }

        try {
            $userData = Admin::where('token',$request->token)->firstOrFail();
        } catch (\Exception $exception) {

//          throw new TokenException($exception);
            return response('320');
        }
//        new TokenUpdater(User::where('token',JWTAuth::getToken())->first());

        Auth::guard('admin')->login($userData);
        $_POST['user'] = $userData;

        /**
         * checks authenticated user guard
         */

//        if(Auth::guard('admin')->check()){

            session(['userToken' => $userData]);
            return $next($request);
//        }
//        else{
//            return response('320');
//        }

}
}
